import React, { useState } from 'react';
import { 
  MessageSquare, Send, Users, Megaphone, 
  Bell, AlertCircle, Info, CheckCircle2,
  Search, Filter, Plus, Mail, Smartphone,
  History, Clock
} from 'lucide-react';
import { motion } from 'motion/react';

const broadcasts = [
  { id: 1, title: 'May Bonus Policy Update', body: 'All registrations in Yelahanka Block A will receive 1.5x points...', type: 'POLICY', date: '2h ago', status: 'SENT' },
  { id: 2, title: 'New Training Material: KYC 2.0', body: 'Please ensure all field executives review the new Aadhaar...', type: 'TRAINING', date: '1d ago', status: 'READ' },
  { id: 3, title: 'Holiday Operations Notice', body: 'Regional operations will remain open during the weekend...', type: 'GENERAL', date: '3d ago', status: 'READ' },
];

export default function CommunicationCentre() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Communication Centre</h1>
          <p className="text-slate-500 font-medium mt-1">Direct broadcasts and team announcements</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Broadcast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Compose / Channel selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Select Channel</h3>
            <div className="space-y-3">
              {[
                { label: 'Field Mobile App', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50', count: '15 Active' },
                { label: 'Staff WhatsApp', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50', count: 'Synced' },
                { label: 'Official Email', icon: Mail, color: 'text-indigo-600', bg: 'bg-indigo-50', count: 'Managed' },
              ].map((channel, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${channel.bg} ${channel.color} rounded-xl flex items-center justify-center`}>
                      <channel.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{channel.label}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{channel.count}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-[32px] text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-rose-400" />
              Target Audience
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-slate-400">All Field Executives</span>
                <span className="text-xs font-bold">12 Selected</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-slate-400">Regional Cluster</span>
                <span className="text-xs font-bold text-rose-400">North Bangalore</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold tracking-widest uppercase transition-all">
              Manage Groups
            </button>
          </div>
        </div>

        {/* Right Column - Broadcast History */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Broadcast History</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search history..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none" />
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            {broadcasts.map((msg) => (
              <div key={msg.id} className="p-6 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-100 hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black tracking-widest ${
                      msg.type === 'POLICY' ? 'bg-rose-50 text-rose-600' : 
                      msg.type === 'TRAINING' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {msg.type}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{msg.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{msg.date}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 mb-4 leading-relaxed">{msg.body}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-400">12 Recipients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-400">Sent on May 30</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{msg.status}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-8 w-full py-4 border-2 border-dashed border-slate-100 rounded-3xl text-xs font-bold text-slate-400 hover:border-primary/20 hover:text-primary transition-all uppercase tracking-[0.2em]">
            View Detailed Delivery Logs
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
