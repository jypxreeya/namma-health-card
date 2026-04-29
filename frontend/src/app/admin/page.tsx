'use client';

import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { 
  Users, 
  CreditCard, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const response = await api.get('/admin/analytics/dashboard/overview');
      return (response.data as any).data;
    },
  });

  const kpis = [
    { label: 'Total Patients', value: stats?.totalPatients || 0, icon: Users, trend: '+12%', trendUp: true },
    { label: 'Active Memberships', value: stats?.activeMemberships || 0, icon: CreditCard, trend: '+5%', trendUp: true },
    { label: 'Total Visits', value: stats?.totalVisits || 0, icon: Activity, trend: '+18%', trendUp: true },
    { label: 'Total Revenue', value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`, icon: TrendingUp, trend: '-2%', trendUp: false },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 h-96 bg-slate-200 rounded-xl" />
            <div className="h-96 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
        <p className="text-slate-500">Real-time statistics for Namma Health Card ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="card-premium p-6 hover:border-primary/30 transition-all cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <kpi.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                kpi.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {kpi.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {isLoading ? '...' : kpi.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-premium p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-slate-800">Registration Trends</h3>
            <select className="text-sm border-slate-200 rounded-md focus:ring-primary focus:border-primary">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-sm italic font-medium">Chart Visualization Placeholder (Integrate Recharts)</p>
          </div>
        </div>

        <div className="card-premium p-8">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">New Registration</p>
                  <p className="text-xs text-slate-500">Patient LD-2026-00{i} joined via Indiranagar area.</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-bold text-primary hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100">
            View All Activity
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
