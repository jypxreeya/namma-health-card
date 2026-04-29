'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { 
  Search, 
  QrCode, 
  UserCheck, 
  Activity, 
  ChevronRight,
  ShieldAlert,
  Loader2,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HospitalDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const { data: searchResults, isLoading, refetch } = useQuery({
    queryKey: ['patient-search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const response = await api.get(`/hospital/patient/search?q=${searchQuery}`);
      return (response.data as any).data;
    },
    enabled: false, // Don't run automatically
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-slate-200 rounded-xl" />
            <div className="h-96 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hospital Reception</h1>
        <p className="text-slate-500">Search and check-in Namma Health Card patients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="card-premium p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Mobile, Name or Card Number..."
                  className="input-field pl-10 h-12"
                />
              </div>
              <button type="submit" className="btn-primary h-12 px-8 flex items-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                Search
              </button>
              <button 
                type="button"
                onClick={() => setIsScanning(!isScanning)}
                className={cn(
                  "h-12 w-12 flex items-center justify-center rounded-lg border transition-all",
                  isScanning ? "bg-primary text-white border-primary" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                )}
              >
                <QrCode size={24} />
              </button>
            </form>
          </div>

          {/* Search Results */}
          <div className="card-premium min-h-[400px]">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Search Results</h3>
            </div>
            
            {!searchQuery ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Search size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">Enter a search query to find patients</p>
              </div>
            ) : isLoading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : searchResults?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <ShieldAlert size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">No patients found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {searchResults?.map((patient: any) => (
                  <div 
                    key={patient.id} 
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-rose-50/10 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                      {patient.fullName[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{patient.fullName}</h4>
                      <p className="text-xs text-slate-500">{patient.mobile} • {patient.patientCode}</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div className="hidden sm:block">
                        <span className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase",
                          patient.memberships?.[0] ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                        )}>
                          {patient.memberships?.[0] ? 'Active Member' : 'No Membership'}
                        </span>
                      </div>
                      <button className="p-2 rounded-lg bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-premium p-6">
            <h3 className="font-bold text-slate-800 mb-6">Reception Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <UserCheck className="text-emerald-500" size={20} />
                  <span className="text-sm font-medium text-slate-600">Total Check-ins Today</span>
                </div>
                <span className="text-lg font-bold text-slate-800">24</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="text-primary" size={20} />
                  <span className="text-sm font-medium text-slate-600">Pending Services</span>
                </div>
                <span className="text-lg font-bold text-slate-800">08</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Need to Register?</h4>
              <p className="text-xs text-slate-400 mb-4">New patients can be registered via the field executive app or admin portal.</p>
              <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
                Contact Field Team
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Users size={80} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
