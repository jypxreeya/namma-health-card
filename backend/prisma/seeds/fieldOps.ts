import { PrismaClient } from '@prisma/client';

export async function seedFieldOps(prisma: PrismaClient, superAdminId: string) {
  // Create an Area Assignment for the Super Admin (acting as manager for demo)
  const area = await prisma.areaAssignment.create({
    data: {
      executiveId: superAdminId,
      areaName: 'Bangalore Central',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
      assignmentStatus: 'ACTIVE',
    },
  });
  console.log(`Area Assignment seeded: ${area.areaName}`);

  // Create an Executive Target
  const target = await prisma.executiveTarget.create({
    data: {
      executiveId: superAdminId,
      targetPeriod: '2026-05',
      targetRegistrations: 100,
      achievedRegistrations: 0,
      targetRevenue: 49900.00,
      achievedRevenue: 0.00,
    },
  });
  console.log(`Executive Target seeded for period: ${target.targetPeriod}`);

  // Create a Demo Lead
  const lead = await prisma.lead.upsert({
    where: { leadCode: 'LD-202605-001' },
    update: {},
    create: {
      leadCode: 'LD-202605-001',
      fullName: 'Ramesh Kumar',
      mobile: '9876543210',
      area: 'MG Road',
      source: 'FIELD_CANVASSING',
      leadStatus: 'NEW',
      assignedExecutiveId: superAdminId,
      notes: 'Met at the mall kiosk, interested in family plan.',
    },
  });
  console.log(`Demo Lead seeded: ${lead.leadCode}`);
}
