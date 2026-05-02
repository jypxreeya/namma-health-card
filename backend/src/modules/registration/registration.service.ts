import { prisma } from '../../config/prisma';
import { Prisma, RelationshipType } from '@prisma/client';

export class RegistrationService {
  private isUniqueConstraintError(error: unknown) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
  }

  private async createPatientWithRetry(tx: Prisma.TransactionClient, data: Omit<Prisma.PatientCreateInput, 'patientCode'>) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await tx.patient.create({
          data: {
            ...data,
            patientCode: `NHC-${Date.now().toString().slice(-6)}-${attempt}`,
          }
        });
      } catch (error) {
        if (!this.isUniqueConstraintError(error) || attempt === 2) {
          throw error;
        }
      }
    }
    throw new Error('Unable to generate a unique patient code.');
  }

  private async createHealthCardWithRetry(tx: Prisma.TransactionClient, data: Omit<Prisma.HealthCardUncheckedCreateInput, 'cardNumber'>) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await tx.healthCard.create({
          data: {
            ...data,
            cardNumber: `CARD-${Date.now().toString().slice(-6)}-${attempt}`,
          }
        });
      } catch (error) {
        if (!this.isUniqueConstraintError(error) || attempt === 2) {
          throw error;
        }
      }
    }
    throw new Error('Unable to generate a unique card number.');
  }

  private normalizeRelationship(value: string): RelationshipType {
    const normalized = String(value || '').toUpperCase();
    if (Object.values(RelationshipType).includes(normalized as RelationshipType)) {
      return normalized as RelationshipType;
    }
    return RelationshipType.OTHER;
  }

  /**
   * Complex Orchestration: Onboard a new Patient.
   * Wraps everything in an atomic transaction to ensure data integrity.
   */
  async onboardPatient(payload: any, executiveId: string) {
    const { 
      mobile, 
      fullName, 
      address, 
      consent, 
      familyMembers, 
      planCode,
      leadId 
    } = payload;

    return await prisma.$transaction(async (tx) => {
      // 1. Verify Patient doesn't already exist
      const existingPatient = await tx.patient.findUnique({
        where: { mobile },
      });
      if (existingPatient) {
        throw new Error(`Patient with mobile ${mobile} already exists.`);
      }

      // 2. Fetch Membership Plan
      const plan = await tx.membershipPlan.findUnique({
        where: { planCode },
      });
      if (!plan) {
        throw new Error(`Invalid plan code: ${planCode}`);
      }

      // 3. Create Patient & Address
      const patient = await this.createPatientWithRetry(tx, {
          fullName,
          mobile,
          fieldExecutive: {
            connect: { id: executiveId }
          },
          addresses: {
            create: {
              addressLine1: address.line1,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
            }
          }
      });

      // 4. Log Consent
      await tx.consentRecord.create({
        data: {
          patientId: patient.id,
          consentType: 'REGISTRATION_AND_DATA_PROCESSING',
          consentVersion: consent.version || '1.0',
          status: consent.granted ? 'GRANTED' : 'REVOKED',
          ipAddress: consent.ip,
        }
      });

      // 5. Add Family Members
      if (familyMembers && familyMembers.length > 0) {
        await tx.familyMember.createMany({
          data: familyMembers.map((fm: any) => ({
            patientId: patient.id,
            fullName: fm.fullName,
            relationshipType: this.normalizeRelationship(fm.relationship || fm.relationshipType),
            gender: fm.gender,
            dob: fm.dateOfBirth ? new Date(fm.dateOfBirth) : undefined,
          })),
        });
      }

      // 6. Create Membership
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + plan.durationDays);

      const membership = await tx.membership.create({
        data: {
          patientId: patient.id,
          membershipPlanId: plan.id,
          validFrom: new Date(),
          validTo: expiryDate,
          status: 'ACTIVE',
        }
      });

      // 7. Generate Health Card
      const healthCard = await this.createHealthCardWithRetry(tx, {
          patientId: patient.id,
          membershipId: membership.id,
          cardStatus: 'ISSUED',
          expiryDate,
      });

      // 8. Handle Lead Conversion
      if (leadId) {
        const lead = await tx.lead.findUnique({ where: { id: leadId }});
        if (lead && lead.leadStatus !== 'CONVERTED') {
          // Mark Lead Converted
          await tx.lead.update({
            where: { id: leadId },
            data: { leadStatus: 'CONVERTED' },
          });

          // Log Conversion
          await tx.leadConversionLog.create({
            data: {
              leadId: leadId,
              patientId: patient.id,
              convertedById: executiveId,
              conversionNotes: 'Converted during mobile app onboarding',
            }
          });
        }
      }

      // 9. Prepare WhatsApp Payload Event (Mocked)
      // await sqs.sendMessage({ patientMobile: mobile, type: 'WELCOME_AND_CARD' })

      return {
        patient,
        membership,
        healthCard,
        message: 'Patient onboarded successfully',
      };
    });
  }

  /**
   * Save a partial registration as a DRAFT.
   */
  async saveDraft(payload: any, executiveId: string) {
    const { mobile, fullName, leadId } = payload;

    return await prisma.patient.upsert({
      where: { mobile },
      update: {
        fullName,
        fieldExecutiveId: executiveId,
        status: 'DRAFT',
      },
      create: {
        patientCode: `DFT-${Date.now().toString().slice(-6)}`,
        fullName,
        mobile,
        fieldExecutiveId: executiveId,
        status: 'DRAFT',
      }
    });
  }

  /**
   * Fetch all drafts for a specific executive.
   */
  async getDrafts(executiveId: string) {
    return await prisma.patient.findMany({
      where: { 
        fieldExecutiveId: executiveId,
        status: 'DRAFT'
      },
      orderBy: { updatedAt: 'desc' }
    });
  }
}
