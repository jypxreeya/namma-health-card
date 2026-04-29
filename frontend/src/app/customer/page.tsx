'use client';

import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { 
  CreditCard, 
  Users, 
  History, 
  ShieldCheck, 
  Share2, 
  Download,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CustomerDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['customer-dashboard'],
    queryFn: async () => {
      const response = await api.get('/customer/dashboard');
      return (response.data as any).data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="h-64 bg-slate-200 rounded-xl" />
            <div className="lg:col-span-2 h-96 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hello, {stats?.profile?.fullName}!</h1>
        <p className="text-slate-500">Welcome to your Namma Health membership portal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Digital Card Preview */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="font-bold tracking-tighter text-lg italic">NAMMA HEALTH</div>
                <ShieldCheck className="text-primary" size={24} />
              </div>
              <div className="mb-8">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Card Holder</p>
                <p className="text-xl font-medium tracking-wide">{stats?.profile?.fullName?.toUpperCase() || '...'}</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Membership ID</p>
                  <p className="font-mono text-sm tracking-widest text-slate-200">{stats?.activeCard?.cardCode || 'NHC-PENDING'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Valid Thru</p>
                  <p className="text-sm font-medium">{stats?.activeMembership?.expiryDate ? new Date(stats.activeMembership.expiryDate).toLocaleDateString() : '...'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all">
              <Share2 size={18} />
              Share
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all">
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Membership Status */}
          <div className="card-premium p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-primary flex items-center justify-center">
                <CreditCard size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">Active Membership</h3>
                <p className="text-xs text-slate-500 font-medium">{stats?.activeMembership?.plan?.planName || 'Plan Name'}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider">ACTIVE</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-sm text-slate-600 font-medium">Benefits: 20% Discount at City Hospital</p>
              </div>
              <button className="text-xs font-bold text-primary uppercase tracking-wider hover:underline">View All Benefits</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-premium p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Family Members</h4>
                  <p className="text-xs text-slate-500">{stats?.familyCount || 0} Members Added</p>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <History size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Usage History</h4>
                  <p className="text-xs text-slate-500">View recent hospital visits</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium p-6 border-l-4 border-l-primary bg-rose-50/20">
             <div className="flex gap-4">
               <AlertCircle className="text-primary flex-shrink-0" size={24} />
               <div>
                 <h4 className="font-bold text-slate-800">Need help?</h4>
                 <p className="text-sm text-slate-600 mt-1">Our customer support team is available 24/7 for medical assistance and membership queries.</p>
                 <button className="mt-3 text-sm font-bold text-primary hover:underline">Contact Support Team →</button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
