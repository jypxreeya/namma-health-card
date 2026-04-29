import { PrismaClient } from '@prisma/client';

export async function seedFinance(prisma: PrismaClient) {
  console.log('Seeding Finance Module...');

  // 1. Create a Promotional Campaign / Coupon
  await prisma.promotionalCampaign.upsert({
    where: { couponCode: 'NHCWELCOME20' },
    update: {},
    create: {
      campaignName: 'Welcome Launch Offer',
      couponCode: 'NHCWELCOME20',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      validFrom: new Date('2026-01-01'),
      validTo: new Date('2026-12-31'),
      usageLimit: 1000,
      currentUsage: 0,
      isActive: true,
    },
  });

  await prisma.promotionalCampaign.upsert({
    where: { couponCode: 'SAVE500' },
    update: {},
    create: {
      campaignName: 'Flat 500 Discount',
      couponCode: 'SAVE500',
      discountType: 'FIXED',
      discountValue: 500,
      validFrom: new Date('2026-01-01'),
      validTo: new Date('2026-12-31'),
      usageLimit: 500,
      currentUsage: 0,
      isActive: true,
    },
  });

  console.log('Finance Module seeded.');
}
