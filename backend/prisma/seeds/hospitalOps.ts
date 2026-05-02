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
    where: { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }, // Valid v4 UUID
    update: {},
    create: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      hospitalId: hospital.id,
      branchName: 'Indiranagar Main Branch',
      location: 'Near Metro Station',
      city: 'Bangalore',
      status: 'ACTIVE',
    },
  });

  // 3. Create a Reception User (Linking existing Admin as Reception for demo)
  const receptionUser = await prisma.receptionUser.upsert({
    where: { id: '550e8400-e29b-41d4-a716-446655440000' },
    update: {},
    create: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      userId: adminUserId,
      hospitalId: hospital.id,
      branchId: branch.id,
      status: 'ACTIVE',
    },
  });

  // 4. Create Departments
  const opdDept = await prisma.hospitalDepartment.upsert({
    where: { id: 'a47ac10b-58cc-4372-a567-0e02b2c3d47a' },
    update: {},
    create: {
      id: 'a47ac10b-58cc-4372-a567-0e02b2c3d47a',
      branchId: branch.id,
      name: 'OPD - General Medicine',
      status: 'ACTIVE',
    },
  });

  const cardioDept = await prisma.hospitalDepartment.upsert({
    where: { id: 'b47ac10b-58cc-4372-a567-0e02b2c3d47b' },
    update: {},
    create: {
      id: 'b47ac10b-58cc-4372-a567-0e02b2c3d47b',
      branchId: branch.id,
      name: 'Cardiology',
      status: 'ACTIVE',
    },
  });

  // 5. Create Doctors
  await prisma.hospitalDoctor.upsert({
    where: { id: 'c47ac10b-58cc-4372-a567-0e02b2c3d47c' },
    update: {},
    create: {
      id: 'c47ac10b-58cc-4372-a567-0e02b2c3d47c',
      departmentId: opdDept.id,
      branchId: branch.id,
      fullName: 'Dr. Ramesh Kumar',
      specialization: 'General Physician',
      status: 'ACTIVE',
    },
  });

  await prisma.hospitalDoctor.upsert({
    where: { id: 'd47ac10b-58cc-4372-a567-0e02b2c3d47d' },
    update: {},
    create: {
      id: 'd47ac10b-58cc-4372-a567-0e02b2c3d47d',
      departmentId: cardioDept.id,
      branchId: branch.id,
      fullName: 'Dr. Sunita Sharma',
      specialization: 'Cardiologist',
      status: 'ACTIVE',
    },
  });

  console.log('Partner Hospitals, Departments, and Doctors seeded.');
  return { hospitalId: hospital.id, branchId: branch.id, receptionUserId: receptionUser.id };
}
