import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  const rolesData = [
    { name: 'Super Admin', code: 'SUPER_ADMIN', description: 'Full system access' },
    { name: 'Admin', code: 'ADMIN', description: 'Administrative access' },
    { name: 'Field Manager', code: 'FIELD_MANAGER', description: 'Manages field executives' },
    { name: 'Field Executive', code: 'FIELD_EXECUTIVE', description: 'Registers customers on the field' },
    { name: 'Receptionist', code: 'RECEPTIONIST', description: 'Hospital reception access' },
    { name: 'Customer', code: 'CUSTOMER', description: 'End user / Patient' },
  ];

  const roles: Record<string, string> = {};
  for (const r of rolesData) {
    const role = await prisma.role.upsert({
      where: { code: r.code },
      update: {},
      create: r,
    });
    roles[r.code] = role.id;
  }
  console.log('Roles seeded.');
  return roles;
}
