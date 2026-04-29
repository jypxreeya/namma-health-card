import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient, roles: Record<string, string>) {
  if (process.env.SEED_ENV === 'prod') {
    console.log('Skipping User seeding in production environment.');
    return;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin123!', saltRounds);

  if (roles['SUPER_ADMIN']) {
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@nammahealth.com' },
      update: {},
      create: {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@nammahealth.com',
        mobile: '9999999999',
        passwordHash: hashedPassword,
        roleId: roles['SUPER_ADMIN'],
        status: 'ACTIVE',
      },
    });
    console.log('Super Admin user seeded.');
    return adminUser.id;
  }
  return null;
}
