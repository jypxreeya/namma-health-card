'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Hospital, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon: string | null;
  path: string;
  children?: MenuItem[];
}

const iconMap: Record<string, any> = {
  'LayoutDashboard': LayoutDashboard,
  'Users': Users,
  'CreditCard': CreditCard,
  'Hospital': Hospital,
  'BarChart3': BarChart3,
  'Settings': Settings,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const { data: menus, isLoading } = useQuery({
    queryKey: ['menus'],
    queryFn: async () => {
      const response = await api.get('/auth/menus');
      return (response.data as any).data as MenuItem[];
    },
  });

  if (isLoading) return <div className="w-64 bg-secondary h-screen animate-pulse" />;

  return (
    <div className="w-64 bg-secondary text-secondary-foreground h-screen flex flex-col shadow-xl">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-primary tracking-tight">NAMMA HEALTH</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Care Membership</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 mt-4">
        {menus?.map((menu) => (
          <div key={menu.id}>
            <Link
              href={menu.path}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200 group",
                pathname === menu.path 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "hover:bg-slate-800/50 text-slate-300 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                {menu.icon && iconMap[menu.icon] ? (
                  React.createElement(iconMap[menu.icon], { size: 20 })
                ) : (
                  <ChevronRight size={18} />
                )}
                <span className="font-medium">{menu.label}</span>
              </div>
              {menu.children && menu.children.length > 0 && <ChevronDown size={14} />}
            </Link>

            {menu.children && menu.children.length > 0 && pathname.startsWith(menu.path) && (
              <div className="ml-9 mt-2 space-y-1">
                {menu.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.path}
                    className={cn(
                      "block p-2 text-sm rounded-md transition-all",
                      pathname === child.path
                        ? "text-primary font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 p-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.firstName[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{user?.role.name}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
