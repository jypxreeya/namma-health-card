import React from 'react';
import { Search, Phone, MapPin, History, MoreVertical, Map as MapIcon } from 'lucide-react';
import { MOCK_LEADS } from '@/lib/constants';
import { Lead } from '@/lib/types';

export default function LeadsPage() {
  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto w-full space-y-8">
      {/* Search & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-center">
          <label className="text-label-lg text-on-surface-variant mb-2 block">Search Potential Patients</label>
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input 
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none font-sans" 
              placeholder="Search by name, ID, or phone number..." 
              type="text"
            />
          </div>
        </div>
        
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          <div className="bg-primary p-6 rounded-2xl shadow-lg flex flex-col justify-between text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Today's Leads</span>
            <span className="font-display text-4xl font-bold">24</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Conversion</span>
            <span className="font-display text-4xl font-bold text-primary">18%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button className="h-10 px-6 rounded-full bg-primary text-white font-label-lg whitespace-nowrap shadow-md">All Leads</button>
          <button className="h-10 px-6 rounded-full bg-white border border-slate-200 text-slate-600 font-label-lg whitespace-nowrap hover:bg-slate-50 transition-colors">By Priority</button>
          <button className="h-10 px-6 rounded-full bg-white border border-slate-200 text-slate-600 font-label-lg whitespace-nowrap hover:bg-slate-50 transition-colors">By Region</button>
        </div>
        <div className="text-slate-500 text-sm font-sans">
          Showing <span className="font-bold text-on-surface">128</span> active leads
        </div>
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_LEADS.map((lead: Lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>

      {/* Regional Heatmap Section */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-8 md:col-span-1 space-y-6">
            <div>
              <h3 className="font-display text-title-lg text-on-surface mb-2">Regional Heatmap</h3>
              <p className="text-slate-500 text-sm font-sans">Distribution of uncontacted leads across your current operational zone.</p>
            </div>
            
            <div className="space-y-4">
              <HeatmapItem label="North District" percentage={70} />
              <HeatmapItem label="West Valley" percentage={45} />
            </div>
          </div>
          
          <div className="md:col-span-2 relative min-h-[250px] bg-slate-50">
            <img 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrQEYfRgULPDYGG9ccBkfQHUd_4tvbQ6IsBfEYbYG_YUOluc0SXJ_isghYrwOwQJpGsRSQOw-ylWu8mZtFFzwyD2vbnGlBh8ekH6gHDMXGCZoFwbCLLfflT-hD-WJAuBwzZhe4Q6cWXc29eaW1m59Rbvx1rt_DqhsOKzoF_paRx4IeKvfF9_aNKb3vcFAmj6kUXfZ7X9Lgu0tPAM0Ro3UH2CKc42DfhYlxafuAG50h6kBdDQ-n6kB9BIHIt3WodiLIKjFA-krsnVpK" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent"></div>
            <div className="absolute inset-0 p-8 flex items-end justify-end">
              <button className="bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 font-label-lg hover:bg-slate-50 transition-all text-on-surface">
                <MapIcon className="w-5 h-5 text-primary" />
                Expand Full Map
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead, key?: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-rose-100 text-rose-700 border-l-primary';
      case 'Contacted': return 'bg-amber-100 text-amber-700 border-l-amber-400';
      case 'Interested': return 'bg-emerald-100 text-emerald-700 border-l-emerald-500';
      case 'Not Interested': return 'bg-slate-100 text-slate-600 border-l-slate-400';
      default: return 'bg-slate-100 text-slate-600 border-l-slate-400';
    }
  };

  const statusColorClass = getStatusColor(lead.status);

  return (
    <div className={`group bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all border-l-4 ${statusColorClass.split(' ')[2]}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-bold text-lg">{lead.initials}</div>
          <div>
            <h3 className="font-display text-lg font-bold text-on-surface leading-tight">{lead.name}</h3>
            <p className="text-slate-500 text-xs font-sans">ID: {lead.leadId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColorClass.split(' ')[0]} ${statusColorClass.split(' ')[1]}`}>
          {lead.status}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-slate-600">
          <Phone className="w-4 h-4" />
          <span className="text-xs font-sans">{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-sans">{lead.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <History className="w-4 h-4" />
          <span className="text-xs font-sans italic">Last Activity: {lead.lastActivity}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 h-11 rounded-xl bg-primary text-white font-label-lg hover:bg-rose-700 transition-colors shadow-sm font-display tracking-wide">
          {lead.status === 'New' ? 'Log Call' : lead.status === 'Interested' ? 'Start Visit' : 'Manage Lead'}
        </button>
        <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function HeatmapItem({ label, percentage }: { label: string, percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
        <span>{label}</span>
        <span className="text-on-surface">{percentage}% Density</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
