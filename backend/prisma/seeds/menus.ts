import { PrismaClient } from '@prisma/client';

export async function seedMenus(prisma: PrismaClient, roles: Record<string, string>) {
  const rootMenus = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Field Operations', path: '/field', icon: 'Users' },
    { label: 'Hospital Reception', path: '/hospital', icon: 'Hospital' },
    { label: 'Finance Management', path: '/admin/finance', icon: 'CreditCard' },
    { label: 'Analytics & BI', path: '/admin/analytics', icon: 'BarChart3' },
  ];

  const menus: Record<string, string> = {};
  for (const m of rootMenus) {
    let menu = await prisma.menu.findFirst({ where: { path: m.path } });
    if (!menu) {
      menu = await prisma.menu.create({
        data: {
          label: m.label,
          path: m.path,
          icon: m.icon,
        },
      });
    }
    menus[m.path] = menu.id;
  }
  console.log('Menus seeded.');

  if (roles['SUPER_ADMIN']) {
    for (const mKey of Object.keys(menus)) {
      await prisma.roleMenuAccess.upsert({
        where: {
          roleId_menuId: {
            roleId: roles['SUPER_ADMIN'],
            menuId: menus[mKey],
          },
        },
        update: {},
        create: {
          roleId: roles['SUPER_ADMIN'],
          menuId: menus[mKey],
        },
      });
    }
    console.log('Menus assigned to Super Admin.');
  }

  return menus;
}
