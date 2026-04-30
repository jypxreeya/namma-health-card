import { PrismaClient } from '@prisma/client';

export async function seedHierarchy(prisma: PrismaClient, userIds: Record<string, string>, roleIds: Record<string, string>) {
  console.log('Seeding Team Hierarchy and Regions...');

  // 1. Create a Region
  const region = await prisma.region.upsert({
    where: { name: 'North Bangalore' },
    update: {},
    create: {
      name: 'North Bangalore',
      description: 'Primary operations for North Bangalore cluster',
    },
  });

  // 2. Create a Territory
  const territory = await prisma.territory.upsert({
    where: { id: '77777777-7777-7777-7777-777777777777' }, // Fixed ID for seeding
    update: {},
    create: {
      id: '77777777-7777-7777-7777-777777777777',
      name: 'Yelahanka Block A',
      regionId: region.id,
      description: 'High density residential area',
    },
  });

  // 3. Create a Field Manager User
  const manager = await prisma.user.upsert({
    where: { mobile: '9988776655' },
    update: {},
    create: {
      firstName: 'Ravi',
      lastName: 'Manager',
      email: 'ravi.manager@nammahealth.com',
      mobile: '9988776655',
      employeeId: 'FM001',
      passwordHash: '$2b$10$K7L1OJzYnZ9/6PZ8X7z9Ye8X7z9Ye8X7z9Ye8X7z9Ye8X7z9Ye', // admin123!
      roleId: roleIds['FIELD_MANAGER'] || userIds['SUPER_ADMIN'], // Use SUPER_ADMIN as fallback if FIELD_MANAGER role not found
      assignedRegionId: region.id,
      status: 'ACTIVE',
    },
  });

  // 4. Link an existing Executive to this Manager
  if (userIds['FIELD_EXECUTIVE']) {
    await prisma.user.update({
      where: { id: userIds['FIELD_EXECUTIVE'] },
      data: {
        managerId: manager.id,
        assignedRegionId: region.id,
      },
    });

    // Update AreaAssignment to link to Territory
    await prisma.areaAssignment.updateMany({
      where: { executiveId: userIds['FIELD_EXECUTIVE'] },
      data: { territoryId: territory.id },
    });
  }

  console.log('Hierarchy and Regions seeded.');
  return { regionId: region.id, managerId: manager.id };
}
