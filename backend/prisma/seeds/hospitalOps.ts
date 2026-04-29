import { PrismaClient } from '@prisma/client';

export async function seedPartnerHospitals(prisma: PrismaClient, adminUserId: string) {
  console.log('Seeding Partner Hospitals...');

  // 1. Create a Partner Hospital
  const hospital = await prisma.partnerHospital.upsert({
    where: { hospitalCode: 'HOSP-CITY-001' },
    update: {},
    create: {
      hospitalCode: 'HOSP-CITY-001',
      hospitalName: 'City Multi-Specialty Hospital',
      registrationNumber: 'REG-123456',
      contactPhone: '080-1234567',
      contactEmail: 'contact@cityhospital.com',
      address: '123 Main St, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      status: 'ACTIVE',
    },
  });

  // 2. Create a Branch
  const branch = await prisma.hospitalBranch.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' }, // Dummy UUID for stability
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      hospitalId: hospital.id,
      branchName: 'Indiranagar Main Branch',
      location: 'Near Metro Station',
      city: 'Bangalore',
      status: 'ACTIVE',
    },
  });

  // 3. Create a Reception User (Linking existing Admin as Reception for demo)
  await prisma.receptionUser.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      userId: adminUserId,
      hospitalId: hospital.id,
      branchId: branch.id,
      status: 'ACTIVE',
    },
  });

  console.log('Partner Hospitals seeded.');
  return { hospitalId: hospital.id, branchId: branch.id };
}
