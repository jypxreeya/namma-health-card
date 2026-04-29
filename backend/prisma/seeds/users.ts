import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient, roles: Record<string, string>) {
  if (process.env.SEED_ENV === 'prod') {
    console.log('Skipping User seeding in production environment.');
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin123!', saltRounds);

  const usersToSeed = [
    {
      email: 'admin@nammahealth.com',
      firstName: 'Super',
      lastName: 'Admin',
      mobile: '9999999999',
      roleCode: 'SUPER_ADMIN'
    },
    {
      email: 'field@nammahealth.com',
      firstName: 'Rahul',
      lastName: 'Executive',
      mobile: '8888888888',
      roleCode: 'FIELD_EXECUTIVE'
    },
    {
      email: 'reception@nammahealth.com',
      firstName: 'Priya',
      lastName: 'Reception',
      mobile: '7777777777',
      roleCode: 'RECEPTIONIST'
    },
    {
      email: 'customer@nammahealth.com',
      firstName: 'Ravi',
      lastName: 'Customer',
      mobile: '6666666666',
      roleCode: 'CUSTOMER'
    }
  ];

  const userIds: Record<string, string> = {};

  for (const u of usersToSeed) {
    if (roles[u.roleCode]) {
      const user = await prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          mobile: u.mobile,
          passwordHash: hashedPassword,
          roleId: roles[u.roleCode],
          status: 'ACTIVE',
        },
      });
      userIds[u.roleCode] = user.id;
    }
  }

  console.log('Users seeded (admin123!).');
  return userIds;
}
