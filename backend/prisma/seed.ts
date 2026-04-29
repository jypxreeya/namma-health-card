import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeds/roles';
import { seedPermissions } from './seeds/permissions';
import { seedMenus } from './seeds/menus';
import { seedUsers } from './seeds/users';
import { seedMembershipPlans } from './seeds/memberships';
import { seedFieldOps } from './seeds/fieldOps';
import { seedPartnerHospitals } from './seeds/hospitalOps';
import { seedFinance } from './seeds/finance';
import { seedCustomerEngagement } from './seeds/customerEngagement';
import { seedAnalytics } from './seeds/analytics';

const prisma = new PrismaClient();

async function main() {
  console.log(`Starting database seed... (ENV: ${process.env.SEED_ENV || 'dev'})`);

  const roles = await seedRoles(prisma);
  await seedPermissions(prisma, roles);
  await seedMenus(prisma, roles);
  const adminUserId = await seedUsers(prisma, roles);
  await seedMembershipPlans(prisma);
  
  if (adminUserId) {
    await seedFieldOps(prisma, adminUserId);
    await seedPartnerHospitals(prisma, adminUserId);
  }
  await seedFinance(prisma);
  await seedCustomerEngagement(prisma);
  await seedAnalytics(prisma);

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
