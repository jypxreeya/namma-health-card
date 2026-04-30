import React from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, FileSearch, 
  History, UserX, UserCheck, Smartphone, Search,
  Filter, ArrowRight, MoreVertical, BadgeCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const auditLogs = [
  { id: 'LOG-442', type: 'FRAUD_RISK', title: 'Suspicious Velocity Detected', entity: 'EX-104 (Meera V.)', status: 'CRITICAL', time: '12m ago' },
  { id: 'LOG-440', type: 'KYC_GAP', title: 'Missing Consent Signature', entity: 'Patient: Rajesh Kumar', status: 'HIGH', time: '45m ago' },
  { id: 'LOG-438', type: 'DUPLICATE', title: 'Duplicate Aadhar Reference', entity: 'Patient: Sunita M.', status: 'MEDIUM', time: '2h ago' },
  { id: 'LOG-435', type: 'POLICY', title: 'Registration Outside Territory', entity: 'EX-103 (Anil K.)', status: 'LOW', time: '5h ago' },
];

export default function ComplianceAudit() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Compliance & Audit</h1>
          <p className="text-slate-500 font-medium mt-1">Policy enforcement and suspicious activity monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-rose-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-rose-200 hover:scale-[1.02] transition-all flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Trigger Immediate Audit
          </button>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Audits Today', value: '142', icon: FileSearch, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Critical Violations', value: '03', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Consent Accuracy', value: '99.2%', icon: BadgeCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Escalations Pending', value: '08', icon: History, color: 'text-indigo-600', bg: 'bg-indigo-50' },
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

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Suspicious Activity Logs</h3>
          <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Clear Resolved</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Audit ID</th>
                <th className="px-6 py-4">Violation Type</th>
                <th className="px-6 py-4">Subject/Entity</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6 text-sm font-bold text-slate-800">{log.id}</td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{log.title}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-medium text-slate-500">{log.entity}</td>
                  <td className="px-6 py-6">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest ${
                      log.status === 'CRITICAL' ? 'bg-rose-500 text-white' : 
                      log.status === 'HIGH' ? 'bg-rose-50 text-rose-600' : 
                      log.status === 'MEDIUM' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-xs text-slate-400 font-bold">{log.time}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-primary hover:bg-slate-50 rounded-lg transition-all font-bold text-xs uppercase tracking-widest">Investigate</button>
                      <button className="p-2 text-slate-300 hover:text-slate-500 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
