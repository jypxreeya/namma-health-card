'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function DashboardRedirect() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.role.code === 'ADMIN' || user?.role.code === 'SUPER_ADMIN') {
      router.push('/admin');
    } else if (user?.role.code === 'FIELD_EXECUTIVE') {
      router.push('/field');
    } else if (user?.role.code === 'CUSTOMER') {
      router.push('/customer');
    } else if (user?.role.code === 'RECEPTION') {
      router.push('/hospital');
    } else {
      // Default fallback
      router.push('/admin');
    }
  }, [user, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 mb-4" />
        <p className="text-slate-500 font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
