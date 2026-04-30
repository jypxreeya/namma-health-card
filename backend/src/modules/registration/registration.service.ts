import { prisma } from '../../config/prisma';
import { Prisma } from '@prisma/client';

export class RegistrationService {
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
      const patientCode = `NHC-${Date.now().toString().slice(-6)}`;
      const patient = await tx.patient.create({
        data: {
          patientCode,
          fullName,
          mobile,
          fieldExecutiveId: executiveId,
          addresses: {
            create: {
              addressLine1: address.line1,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
            }
          }
        }
      });

      // 4. Log Consent
      await tx.consentRecord.create({
        data: {
          patientId: patient.id,
          consentType: 'REGISTRATION_AND_DATA_PROCESSING',
          consentStatus: consent.granted ? 'GRANTED' : 'REVOKED',
          ipAddress: consent.ip,
          userAgent: consent.userAgent,
        }
      });

      // 5. Add Family Members
      if (familyMembers && familyMembers.length > 0) {
        await tx.familyMember.createMany({
          data: familyMembers.map((fm: any) => ({
            patientId: patient.id,
            fullName: fm.fullName,
            relationship: fm.relationship,
            gender: fm.gender,
            dateOfBirth: new Date(fm.dateOfBirth),
          })),
        });
      }

      // 6. Create Membership
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + plan.durationDays);

      const membership = await tx.membership.create({
        data: {
          patientId: patient.id,
          planCode: plan.planCode,
          startDate: new Date(),
          expiryDate: expiryDate,
          status: 'ACTIVE',
        }
      });

      // 7. Generate Health Card
      const cardNumber = `CARD-${Math.floor(100000 + Math.random() * 900000)}`;
      const healthCard = await tx.healthCard.create({
        data: {
          patientId: patient.id,
          membershipId: membership.id,
          cardNumber: cardNumber,
          cardStatus: 'ISSUED',
        }
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
