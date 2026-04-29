'use client';

import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { 
  Users, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock,
  PlusCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FieldDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['field-dashboard'],
    queryFn: async () => {
      const response = await api.get('/field/dashboard');
      return (response.data as any).data;
    },
  });

  const cards = [
    { label: 'Total Leads', value: stats?.totalLeads || 0, icon: Users, color: 'bg-blue-500' },
    { label: 'Visits Today', value: stats?.visitsToday || 0, icon: Calendar, color: 'bg-amber-500' },
    { label: 'Conversions', value: stats?.conversionsThisMonth || 0, icon: CheckCircle2, color: 'bg-emerald-500' },
    { label: 'Target Completion', value: '78%', icon: Clock, color: 'bg-indigo-500' },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="h-64 bg-slate-200 rounded-xl" />
            <div className="h-64 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Field Operations</h1>
          <p className="text-slate-500">Manage your leads and patient registrations.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-fit">
          <PlusCircle size={20} />
          New Registration
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, idx) => (
          <div key={idx} className="card-premium p-6">
            <div className={cn("w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white shadow-lg", card.color)}>
              <card.icon size={24} />
            </div>
            <p className="text-sm text-slate-500 font-medium">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {isLoading ? '...' : card.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-premium">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Today's Visits</h3>
            <button className="text-xs font-bold text-primary uppercase tracking-wider">View Schedule</button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800">Rahul Sharma</h4>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">PLANNED</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Indiranagar, Bangalore • 10:30 AM</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-[10px] font-bold bg-slate-800 text-white px-3 py-1.5 rounded-md hover:bg-slate-700">CHECK-IN</button>
                      <button className="text-[10px] font-bold border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md hover:bg-slate-50">RESCHEDULE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-premium">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Leads</h3>
            <button className="text-xs font-bold text-primary uppercase tracking-wider">All Leads</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium text-slate-800">Suresh Kumar</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold">NEW</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">Today</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
