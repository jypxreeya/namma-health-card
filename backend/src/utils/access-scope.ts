import { prisma } from '../config/prisma';

export type AuthUser = {
  id: string;
  role: string;
};

export const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN'];

export function isAdminRole(role?: string) {
  return !!role && ADMIN_ROLES.includes(role);
}

export async function getVisibleFieldExecutiveIds(user: AuthUser) {
  if (isAdminRole(user.role)) {
    return undefined;
  }

  if (user.role === 'FIELD_MANAGER') {
    const subordinates = await prisma.user.findMany({
      where: { managerId: user.id, isDeleted: false },
      select: { id: true },
    });
    return [user.id, ...subordinates.map((subordinate) => subordinate.id)];
  }

  return [user.id];
}

export async function getReceptionScope(user: AuthUser) {
  if (isAdminRole(user.role)) {
    return null;
  }

  if (user.role !== 'RECEPTIONIST') {
    return null;
  }

  return prisma.receptionUser.findFirst({
    where: { userId: user.id, status: 'ACTIVE' },
    select: { id: true, hospitalId: true, branchId: true },
  });
}
