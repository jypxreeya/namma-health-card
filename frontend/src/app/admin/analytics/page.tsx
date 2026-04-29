'use client';

import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Target, 
  Zap, 
  ShieldCheck,
  MoreVertical,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AnalyticsDashboard() {
  const { data: health, isLoading: healthLoading } = useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      const response = await api.get('/admin/analytics/system-health');
      return (response.data as any).data;
    },
  });

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Business Intelligence</h1>
          <p className="text-slate-500">Advanced metrics and growth forecasting.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export Data
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Zap size={18} />
            Recalculate Metrics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Target size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">On Track</span>
          </div>
          <h4 className="text-sm font-medium text-slate-500">Executive Score</h4>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-slate-800">84.2</h3>
            <span className="text-xs text-slate-400 mb-1">/ 100</span>
          </div>
        </div>

        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-50 text-primary rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full uppercase">Critical</span>
          </div>
          <h4 className="text-sm font-medium text-slate-500">Churn Risk</h4>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-2xl font-bold text-slate-800">4.2%</h3>
            <span className="text-xs text-rose-400 mb-1">+0.8%</span>
          </div>
        </div>

        <div className="card-premium p-6 lg:col-span-2">
           <div className="flex items-center justify-between mb-4">
             <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">System Health</h4>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs font-bold text-emerald-600 uppercase">Operational</span>
             </div>
           </div>
           <div className="grid grid-cols-3 gap-4">
             <div>
               <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Latency</p>
               <p className="text-sm font-mono font-bold text-slate-700">42ms</p>
             </div>
             <div>
               <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Uptime</p>
               <p className="text-sm font-mono font-bold text-slate-700">99.98%</p>
             </div>
             <div>
               <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">DB Load</p>
               <p className="text-sm font-mono font-bold text-slate-700">12%</p>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-premium p-8">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-bold text-lg text-slate-800">Conversion Intelligence</h3>
             <MoreVertical className="text-slate-400 cursor-pointer" size={20} />
           </div>
           <div className="h-72 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
             <BarChart3 className="text-slate-300 mb-2" size={48} />
             <p className="text-slate-400 text-sm italic font-medium absolute mt-16">Revenue & Registration Projections</p>
           </div>
        </div>

        <div className="card-premium p-8">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-bold text-lg text-slate-800">Operational Events</h3>
             <button className="text-xs font-bold text-primary uppercase">View Logs</button>
           </div>
           <div className="space-y-4">
              {health?.recentEvents?.slice(0, 5).map((event: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={cn(
                    "w-1 h-auto rounded-full flex-shrink-0",
                    event.severity === 'ERROR' ? 'bg-rose-500' : 'bg-blue-500'
                  )} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-800">{event.eventType}</p>
                      <p className="text-[10px] text-slate-400">{new Date(event.occurredAt).toLocaleTimeString()}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{event.message}</p>
                  </div>
                </div>
              ))}
              {(!health?.recentEvents || health.recentEvents.length === 0) && (
                <div className="text-center py-10 text-slate-400 italic text-sm">
                  No recent operational events.
                </div>
              )}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
