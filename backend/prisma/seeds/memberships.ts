import { PrismaClient } from '@prisma/client';

export async function seedMembershipPlans(prisma: PrismaClient) {
  const plansData = [
    {
      planCode: 'NAMMA_BASIC_1YR',
      planName: 'Namma Health Basic (1 Year)',
      durationDays: 365,
      pricing: 499.00,
      familyLimit: 4,
      benefits: {
        discounts: { opd: 10, diagnostics: 10, pharmacy: 5 },
        freeConsultations: 2,
        priorityBooking: false
      }
    },
    {
      planCode: 'NAMMA_PREMIUM_1YR',
      planName: 'Namma Health Premium (1 Year)',
      durationDays: 365,
      pricing: 999.00,
      familyLimit: 6,
      benefits: {
        discounts: { opd: 20, diagnostics: 20, pharmacy: 10 },
        freeConsultations: 5,
        priorityBooking: true
      }
    },
    {
      planCode: 'NAMMA_BASIC_3YR',
      planName: 'Namma Health Basic (3 Years)',
      durationDays: 1095,
      pricing: 1299.00,
      familyLimit: 4,
      benefits: {
        discounts: { opd: 10, diagnostics: 10, pharmacy: 5 },
        freeConsultations: 6,
        priorityBooking: false
      }
    }
  ];

  const membershipPlans: Record<string, string> = {};
  for (const plan of plansData) {
    const createdPlan = await prisma.membershipPlan.upsert({
      where: { planCode: plan.planCode },
      update: {},
      create: plan,
    });
    membershipPlans[plan.planCode] = createdPlan.id;
  }
  
  console.log('Membership Plans seeded.');
  return membershipPlans;
}
