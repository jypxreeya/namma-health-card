import { PrismaClient } from '@prisma/client';

export async function seedPermissions(prisma: PrismaClient, roles: Record<string, string>) {
  const permissionsData = [
    { module: 'USER', action: 'CREATE' },
    { module: 'USER', action: 'READ' },
    { module: 'USER', action: 'UPDATE' },
    { module: 'USER', action: 'DELETE' },
    { module: 'ROLE', action: 'READ' },
    { module: 'ROLE', action: 'UPDATE' },
    { module: 'CARD', action: 'CREATE' },
    { module: 'CARD', action: 'READ' },
  ];

  const permissions: Record<string, string> = {};
  for (const p of permissionsData) {
    const perm = await prisma.permission.upsert({
      where: {
        module_action: {
          module: p.module,
          action: p.action,
        },
      },
      update: {},
      create: p,
    });
    permissions[`${p.module}_${p.action}`] = perm.id;
  }
  console.log('Permissions seeded.');

  // Assign to Super Admin
  if (roles['SUPER_ADMIN']) {
    for (const pKey of Object.keys(permissions)) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roles['SUPER_ADMIN'],
            permissionId: permissions[pKey],
          },
        },
        update: {},
        create: {
          roleId: roles['SUPER_ADMIN'],
          permissionId: permissions[pKey],
        },
      });
    }
    console.log('Permissions assigned to Super Admin.');
  }
  
  return permissions;
}
