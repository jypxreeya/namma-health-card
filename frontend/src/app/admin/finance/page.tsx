'use client';

import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { 
  Wallet, 
  ArrowRightLeft, 
  Percent, 
  FileText,
  TrendingUp,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FinanceDashboard() {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['finance-dashboard'],
    queryFn: async () => {
      const response = await api.get('/finance/dashboard');
      return (response.data as any).data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl" />)}
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
          <h1 className="text-2xl font-bold text-slate-800">Financial Operations</h1>
          <p className="text-slate-500">Revenue, settlements, and commission tracking.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Download size={18} />
          Financial Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card-premium p-6 border-t-4 border-t-emerald-500">
          <p className="text-sm text-slate-500 font-medium">Total Membership Revenue</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-bold text-slate-800">₹{dashboard?.totalMembershipRevenue?.toLocaleString() || '0'}</h3>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
        </div>

        <div className="card-premium p-6 border-t-4 border-t-primary">
          <p className="text-sm text-slate-500 font-medium">Total Discounts Tracked</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-bold text-slate-800">₹{dashboard?.totalDiscountsTracked?.toLocaleString() || '0'}</h3>
            <span className="text-xs text-slate-400 font-medium">Lifetime</span>
          </div>
        </div>

        <div className="card-premium p-6 border-t-4 border-t-blue-500">
          <p className="text-sm text-slate-500 font-medium">Card Utilization Count</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-3xl font-bold text-slate-800">{dashboard?.totalCardUsages || '0'}</h3>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-premium">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Promotional Campaigns</h3>
            <button className="text-xs font-bold text-primary uppercase">New Campaign</button>
          </div>
          <div className="p-4 space-y-3">
            {dashboard?.topCampaigns?.map((campaign: any) => (
              <div key={campaign.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm">
                  <Percent size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{campaign.campaignName}</p>
                  <p className="text-xs text-slate-500">{campaign.couponCode} • {campaign.discountType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{campaign.currentUsage}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Redeemed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium">
           <div className="p-6 border-b border-slate-100">
             <h3 className="font-bold text-slate-800">Quick Actions</h3>
           </div>
           <div className="p-6 grid grid-cols-2 gap-4">
             <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group">
               <div className="p-3 rounded-xl bg-white text-slate-600 group-hover:text-primary transition-colors shadow-sm">
                 <Wallet size={24} />
               </div>
               <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Settlements</span>
             </button>
             <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group">
               <div className="p-3 rounded-xl bg-white text-slate-600 group-hover:text-primary transition-colors shadow-sm">
                 <ArrowRightLeft size={24} />
               </div>
               <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Commissions</span>
             </button>
             <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group">
               <div className="p-3 rounded-xl bg-white text-slate-600 group-hover:text-primary transition-colors shadow-sm">
                 <FileText size={24} />
               </div>
               <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Invoices</span>
             </button>
             <button className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group">
               <div className="p-3 rounded-xl bg-white text-slate-600 group-hover:text-primary transition-colors shadow-sm">
                 <TrendingUp size={24} />
               </div>
               <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Reports</span>
             </button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
