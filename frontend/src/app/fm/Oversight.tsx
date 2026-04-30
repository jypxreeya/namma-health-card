import React, { useState } from 'react';
import { 
  ClipboardCheck, Search, Filter, CheckCircle2, XCircle, 
  Clock, AlertCircle, Eye, ShieldCheck, FileText,
  ArrowRight, Download, MoreVertical, History, User,
  Smartphone, BadgeCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const pendingRegistrations = [
  {
    id: 'REG-10928',
    patient: 'Suresh Kumar',
    executive: 'Kiran R.',
    plan: 'Family Gold',
    date: '10m ago',
    complianceScore: '92%',
    kycStatus: 'VERIFIED',
    duplicateRisk: 'LOW',
    status: 'PENDING_APPROVAL'
  },
  {
    id: 'REG-10925',
    patient: 'Meenakshi Iyer',
    executive: 'Priya S.',
    plan: 'Individual Basic',
    date: '45m ago',
    complianceScore: '85%',
    kycStatus: 'PENDING',
    duplicateRisk: 'MEDIUM',
    status: 'PENDING_APPROVAL'
  },
  {
    id: 'REG-10920',
    patient: 'Ramesh Singh',
    executive: 'Anil K.',
    plan: 'Senior Care',
    date: '2h ago',
    complianceScore: '65%',
    kycStatus: 'REJECTED',
    duplicateRisk: 'HIGH',
    status: 'FLAGGED'
  },
];

export default function RegistrationOversight() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Registration Oversight</h1>
          <p className="text-slate-500 font-medium mt-1">Audit team-wide registrations and manage compliance workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-100 px-5 py-2.5 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Export Audit Logs
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Flagged for Audit', value: '04', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Duplicate Risks', value: '02', icon: History, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'KYC Verification', value: '98%', icon: BadgeCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-bold text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Pending Reviews Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Pending Review Queue</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search Registrations..." className="bg-transparent border-none outline-none text-xs font-medium" />
            </div>
            <button className="text-xs font-bold text-primary px-3 py-2 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all">
              Approve All Verified
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Registration ID</th>
                <th className="px-6 py-4">Patient & Plan</th>
                <th className="px-6 py-4">Field Executive</th>
                <th className="px-6 py-4">Compliance</th>
                <th className="px-6 py-4">KYC Status</th>
                <th className="px-6 py-4">Duplicate Risk</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pendingRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{reg.id}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{reg.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div>
                      <p className="text-sm font-bold text-slate-700">{reg.patient}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{reg.plan}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-medium text-slate-500">{reg.executive}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${parseInt(reg.complianceScore) > 80 ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                      <span className="text-sm font-bold text-slate-700">{reg.complianceScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      reg.kycStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : 
                      reg.kycStatus === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {reg.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className={`w-4 h-4 ${
                        reg.duplicateRisk === 'LOW' ? 'text-emerald-500' : 
                        reg.duplicateRisk === 'MEDIUM' ? 'text-orange-400' : 'text-rose-500'
                      }`} />
                      <span className="text-xs font-bold text-slate-600">{reg.duplicateRisk}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Audit Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Compliance Heatmap</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Regional Cluster View</span>
          </div>
          <div className="flex-1 bg-slate-50 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-slate-100 text-slate-400 py-12">
            <ShieldCheck className="w-12 h-12 opacity-10 mb-4" />
            <p className="text-sm font-bold uppercase tracking-[0.2em]">Audit Map Under Development</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Recent Audit Activity</h3>
          <div className="space-y-6">
            {[
              { label: 'Auto-Reject: Duplicate Mobile Found', meta: 'Lead: 98765xxxx • System', time: '12m ago' },
              { label: 'Aadhaar Verification Success', meta: 'Patient: Meenakshi Iyer • UIDAI', time: '45m ago' },
              { label: 'Consent Withdrawal Alert', meta: 'Patient: Rajesh V. • Digital Signature', time: '1h ago' },
              { label: 'Flagged for Fraud Risk', meta: 'Lead: NHC-9921 • Unusual Pattern', time: '3h ago' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <History className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700">{item.label}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{item.meta} • <span className="text-primary">{item.time}</span></p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-10 w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group">
            View Full Audit Trail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
