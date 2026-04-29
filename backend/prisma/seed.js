"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    // 1. Create Roles
    const rolesData = [
        { name: 'Super Admin', code: 'SUPER_ADMIN', description: 'Full system access' },
        { name: 'Admin', code: 'ADMIN', description: 'Administrative access' },
        { name: 'Field Manager', code: 'FIELD_MANAGER', description: 'Manages field executives' },
        { name: 'Field Executive', code: 'FIELD_EXECUTIVE', description: 'Registers customers on the field' },
        { name: 'Receptionist', code: 'RECEPTIONIST', description: 'Hospital reception access' },
        { name: 'Customer', code: 'CUSTOMER', description: 'End user / Patient' },
    ];
    const roles = {};
    for (const r of rolesData) {
        const role = await prisma.role.upsert({
            where: { code: r.code },
            update: {},
            create: r,
        });
        roles[r.code] = role.id;
    }
    console.log('Roles created.');
    // 2. Create Permissions
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
    const permissions = {};
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
    console.log('Permissions created.');
    // 3. Assign Permissions to Roles (Super Admin gets all)
    for (const pKey of Object.keys(permissions)) {
        await prisma.rolePermission.upsert({
            where: {
                role_id_permission_id: {
                    role_id: roles['SUPER_ADMIN'],
                    permission_id: permissions[pKey],
                },
            },
            update: {},
            create: {
                role_id: roles['SUPER_ADMIN'],
                permission_id: permissions[pKey],
            },
        });
    }
    console.log('Permissions assigned to Super Admin.');
    // 4. Create Menus
    const rootMenus = [
        { label: 'Dashboard', path: '/dashboard', icon: 'dashboard', code: 'MENU_DASHBOARD' },
        { label: 'User Management', path: '/users', icon: 'users', code: 'MENU_USERS' },
        { label: 'Card Registrations', path: '/cards', icon: 'id-card', code: 'MENU_CARDS' },
    ];
    const menus = {};
    for (const m of rootMenus) {
        // Upserting by looking for the first menu with that path (this is a simplified seed)
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
        menus[m.code] = menu.id;
    }
    console.log('Menus created.');
    // 5. Assign Menus to Super Admin
    for (const mKey of Object.keys(menus)) {
        await prisma.roleMenuAccess.upsert({
            where: {
                role_id_menu_id: {
                    role_id: roles['SUPER_ADMIN'],
                    menu_id: menus[mKey],
                },
            },
            update: {},
            create: {
                role_id: roles['SUPER_ADMIN'],
                menu_id: menus[mKey],
            },
        });
    }
    console.log('Menus assigned to Super Admin.');
    // 6. Create Super Admin User
    // Normally you'd hash the password here with bcrypt, but we're keeping it simple for DB schema seeding test
    await prisma.user.upsert({
        where: { email: 'admin@nammahealth.com' },
        update: {},
        create: {
            first_name: 'Super',
            last_name: 'Admin',
            email: 'admin@nammahealth.com',
            mobile: '9999999999',
            password_hash: 'hashed_password_placeholder',
            role_id: roles['SUPER_ADMIN'],
        },
    });
    console.log('Super Admin user created.');
    console.log('Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
