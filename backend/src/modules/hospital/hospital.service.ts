import { prisma } from '../../config/prisma';
import { HospitalVisitStatus, ServiceCategory, VisitDocumentType } from '@prisma/client';

export class HospitalService {
  // 1. Patient Search (by card code, QR, mobile, or name)
  async searchPatient(query: string) {
    return prisma.patient.findMany({
      where: {
        OR: [
          { patientCode: { contains: query, mode: 'insensitive' } },
          { mobile: { contains: query } },
          { fullName: { contains: query, mode: 'insensitive' } },
          { healthCards: { some: { cardNumber: { contains: query, mode: 'insensitive' } } } }
        ],
        isDeleted: false,
      },
      include: {
        healthCards: { where: { cardStatus: 'ACTIVE' } },
        memberships: { where: { status: 'ACTIVE' }, include: { membershipPlan: true } },
        familyMembers: { where: { status: 'ACTIVE' } }
      }
    });
  }

  // 2. Validate Card / Membership
  async validateCard(patientId: string) {
    const card = await prisma.healthCard.findFirst({
      where: { patientId, cardStatus: 'ACTIVE' }
    });

    const membership = await prisma.membership.findFirst({
      where: { patientId, status: 'ACTIVE' },
      include: { membershipPlan: true }
    });

    return {
      cardValid: !!card,
      membershipValid: !!membership && new Date() <= membership.validTo,
      card: card || null,
      membership: membership || null
    };
  }

  // 3. Check-in Patient
  async checkIn(payload: {
    patientId: string;
    beneficiaryId?: string;
    hospitalId: string;
    branchId: string;
    receptionUserId: string;
  }) {
    const { patientId, beneficiaryId, hospitalId, branchId, receptionUserId } = payload;

    // Check for duplicate same-day visit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingVisit = await prisma.patientVisit.findFirst({
      where: {
        patientId,
        beneficiaryId: beneficiaryId || null,
        hospitalId,
        visitDate: { gte: today },
        status: 'CHECKED_IN'
      }
    });

    if (existingVisit) {
      throw new Error('Patient already checked in today at this hospital.');
    }

    // Validate card and membership
    const validation = await this.validateCard(patientId);

    return prisma.patientVisit.create({
      data: {
        patientId,
        beneficiaryId: beneficiaryId || null,
        hospitalId,
        branchId,
        checkedInById: receptionUserId,
        membershipValidated: validation.membershipValid,
        cardValidated: validation.cardValid,
        status: 'CHECKED_IN'
      }
    });
  }

  // 4. Service Entry
  async enterServiceUsage(payload: {
    visitId: string;
    serviceCategory: ServiceCategory;
    serviceName: string;
    benefitUsed: boolean;
    discountGiven: number;
    revenueValue?: number;
    notes?: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const service = await tx.serviceUsage.create({
        data: {
          visitId: payload.visitId,
          serviceCategory: payload.serviceCategory,
          serviceName: payload.serviceName,
          benefitUsed: payload.benefitUsed,
          discountGiven: payload.discountGiven,
          revenueValue: payload.revenueValue,
          notes: payload.notes
        }
      });

      // Log benefit usage for NHC Finance
      if (payload.benefitUsed) {
        const visit = await tx.patientVisit.findUnique({
          where: { id: payload.visitId }
        });
        if (visit) {
          await tx.cardBenefitUsage.create({
            data: {
              patientId: visit.patientId,
              visitId: visit.id,
              hospitalId: visit.hospitalId,
              benefitValue: payload.revenueValue || 0,
              discountGiven: payload.discountGiven,
              usageDate: new Date()
            }
          });
        }
      }

      return service;
    });
  }

  // 5. Visit History
  async getVisitHistory(patientId: string) {
    return prisma.patientVisit.findMany({
      where: { patientId },
      include: {
        hospital: { select: { hospitalName: true } },
        branch: { select: { branchName: true } },
        serviceUsages: true,
        visitDocuments: true
      },
      orderBy: { visitDate: 'desc' }
    });
  }

  // 6. Utilization Dashboard (NHC-only)
  async getUtilizationStats(hospitalId: string) {
    const visits = await prisma.patientVisit.count({ where: { hospitalId } });
    const benefits = await prisma.cardBenefitUsage.aggregate({
      where: { hospitalId },
      _sum: { discountGiven: true, benefitValue: true }
    });

    const recentVisits = await prisma.patientVisit.findMany({
      where: { hospitalId },
      include: {
        patient: { select: { fullName: true, patientCode: true } },
        serviceUsages: { select: { serviceName: true, discountGiven: true } }
      },
      orderBy: { visitDate: 'desc' },
      take: 10
    });

    return {
      totalVisits: visits,
      totalDiscountsGiven: benefits._sum.discountGiven || 0,
      totalBenefitValue: benefits._sum.benefitValue || 0,
      recentVisits
    };
  }
}
