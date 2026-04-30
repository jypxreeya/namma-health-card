import React, { useState } from 'react';
import { 
  Users, Search, Filter, MoreVertical, MapPin, 
  TrendingUp, ShieldCheck, Clock, Calendar,
  ArrowUpRight, Mail, Phone, Map as MapIcon,
  CheckCircle2, AlertCircle, BarChart3, Settings2
} from 'lucide-react';
import { motion } from 'motion/react';

const executives = [
  {
    id: 'EX-101',
    name: 'Kiran R.',
    email: 'kiran.r@nammahealth.com',
    mobile: '9000000001',
    territory: 'Yelahanka Block A',
    status: 'ACTIVE',
    attendance: 'PRESENT',
    lastActive: '2m ago',
    registrations: 142,
    conversion: '72%',
    compliance: '98%',
    performance: 'High',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran'
  },
  {
    id: 'EX-102',
    name: 'Priya S.',
    email: 'priya.s@nammahealth.com',
    mobile: '9000000002',
    territory: 'Yelahanka Block B',
    status: 'ACTIVE',
    attendance: 'PRESENT',
    lastActive: '15m ago',
    registrations: 128,
    conversion: '68%',
    compliance: '95%',
    performance: 'High',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  },
  {
    id: 'EX-103',
    name: 'Anil K.',
    email: 'anil.k@nammahealth.com',
    mobile: '9000000003',
    territory: 'Hebbal West',
    status: 'ACTIVE',
    attendance: 'OFF_DUTY',
    lastActive: '2h ago',
    registrations: 95,
    conversion: '61%',
    compliance: '88%',
    performance: 'Average',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil'
  },
  {
    id: 'EX-104',
    name: 'Meera V.',
    email: 'meera.v@nammahealth.com',
    mobile: '9000000004',
    territory: 'Thanisandra',
    status: 'SUSPENDED',
    attendance: 'ABSENT',
    lastActive: '2d ago',
    registrations: 45,
    conversion: '35%',
    compliance: '72%',
    performance: 'Low',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera'
  }
];

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Team Management</h1>
          <p className="text-slate-500 font-medium mt-1">Oversee your field network and performance rankings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-100 px-5 py-2.5 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Review
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Add Executive
          </button>
        </div>
      </div>

      {/* Team Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Executives', value: '15', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Currently Active', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg. Compliance', value: '94.2%', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'KPI Achievement', value: '88%', icon: BarChart3, color: 'text-rose-600', bg: 'bg-rose-50' },
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

      {/* Directory & Filters */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or territory..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/30 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
              <Settings2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Executive</th>
                <th className="px-6 py-4">Territory</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4 text-right">Registrations</th>
                <th className="px-6 py-4 text-right">Conversion</th>
                <th className="px-6 py-4 text-right">Compliance</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {executives.map((exec) => (
                <tr key={exec.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                        <img src={exec.avatar} alt={exec.name} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{exec.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{exec.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-slate-300" />
                      <span className="text-sm font-medium text-slate-600">{exec.territory}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      exec.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {exec.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        exec.attendance === 'PRESENT' ? 'bg-emerald-500' : 
                        exec.attendance === 'OFF_DUTY' ? 'bg-amber-400' : 'bg-slate-300'
                      }`} />
                      <span className="text-xs font-bold text-slate-500">{exec.attendance}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{exec.lastActive}</p>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-slate-700">{exec.registrations}</td>
                  <td className="px-6 py-5 text-right font-bold text-primary">{exec.conversion}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold text-slate-600">{exec.compliance}</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: exec.compliance }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-500 hover:bg-slate-200 rounded-lg transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Territory & Route Glimpse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Territory Distribution</h3>
            <button className="text-sm font-bold text-primary flex items-center gap-2 group">
              View Map 
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div className="h-64 bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-100">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <MapIcon className="w-10 h-10 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">Territory Heatmap Placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Operational Actions</h3>
            <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[10px] font-bold uppercase tracking-widest">Priority</span>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Reassign Hebbal East Territory', type: 'Assignment', time: 'Immediate' },
              { label: 'Approval Required: Plan S-102 Upgrade', type: 'Verification', time: '12m ago' },
              { label: 'Staff Performance Review: Anil K.', type: 'Oversight', time: 'Due Today' },
            ].map((action, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-slate-100 transition-all">
                <div>
                  <p className="text-sm font-bold text-slate-700">{action.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{action.type} • {action.time}</p>
                </div>
                <button className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
