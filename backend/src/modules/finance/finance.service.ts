import { prisma } from '../../config/prisma';
import { DiscountType, PayoutStatus, SettlementStatus, MembershipPaymentStatus, CardRenewalStatus } from '@prisma/client';

export class FinanceService {
  // 1. Validate Coupon
  async validateCoupon(couponCode: string) {
    const campaign = await prisma.promotionalCampaign.findUnique({
      where: { couponCode }
    });

    if (!campaign) throw new Error('Invalid coupon code.');
    if (!campaign.isActive) throw new Error('Coupon is inactive.');
    if (new Date() < campaign.validFrom || new Date() > campaign.validTo) {
      throw new Error('Coupon has expired or is not yet active.');
    }
    if (campaign.currentUsage >= campaign.usageLimit) {
      throw new Error('Coupon usage limit reached.');
    }

    return campaign;
  }

  // 2. Generate Hospital Settlement Summary (for reporting)
  async getHospitalSettlements(hospitalId?: string) {
    return prisma.partnerHospitalSettlement.findMany({
      where: { hospitalId },
      include: { hospital: { select: { hospitalName: true, hospitalCode: true } } },
      orderBy: { settlementPeriod: 'desc' }
    });
  }

  // 3. Calculate Executive Commissions
  async getExecutiveCommissions(executiveId?: string) {
    return prisma.executiveCommission.findMany({
      where: { executiveId },
      include: {
        executive: { select: { firstName: true, lastName: true } },
        patient: { select: { fullName: true } },
        lead: { select: { fullName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // 4. Record Membership Payment
  async recordMembershipPayment(payload: {
    patientId: string;
    membershipPlanId: string;
    amount: number;
    paymentReference?: string;
  }) {
    return prisma.optionalMembershipPayment.create({
      data: {
        patientId: payload.patientId,
        membershipPlanId: payload.membershipPlanId,
        amount: payload.amount,
        paymentReference: payload.paymentReference,
        paymentStatus: 'PAID' // Assuming successful payment for now
      }
    });
  }

  // 5. Handle Renewal
  async processRenewal(payload: {
    patientId: string;
    previousExpiry: Date;
    newExpiry: Date;
    renewalType: string;
  }) {
    return prisma.cardRenewal.create({
      data: {
        patientId: payload.patientId,
        previousExpiry: payload.previousExpiry,
        newExpiry: payload.newExpiry,
        renewalType: payload.renewalType,
        renewalStatus: 'RENEWED'
      }
    });
  }

  // 6. Finance Dashboard
  async getFinanceDashboard() {
    const [totalRevenue, totalDiscounts, totalUsage] = await Promise.all([
      prisma.optionalMembershipPayment.aggregate({ _sum: { amount: true }, where: { paymentStatus: 'PAID' } }),
      prisma.cardBenefitUsage.aggregate({ _sum: { discountGiven: true } }),
      prisma.cardBenefitUsage.count()
    ]);

    const topCampaigns = await prisma.promotionalCampaign.findMany({
      orderBy: { currentUsage: 'desc' },
      take: 5
    });

    return {
      totalMembershipRevenue: totalRevenue._sum.amount || 0,
      totalDiscountsTracked: totalDiscounts._sum.discountGiven || 0,
      totalCardUsages: totalUsage,
      topCampaigns
    };
  }
}
