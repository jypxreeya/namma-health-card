/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Users, 
  Bed, 
  CreditCard, 
  AlertTriangle, 
  BadgeCheck, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  MoreVertical,
  Activity,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const kpis = [
  { label: "Today's Check-ins", value: "42", trend: "+12% from avg", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Patients", value: "18", trend: "82% occupancy", icon: Bed, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Revenue Today", value: "₹1,24,000", trend: "Goal Reached", icon: CreditCard, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Pending Billing", value: "12", trend: "Needs Attention", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Cards Validated", value: "35", trend: "System v2.1", icon: BadgeCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Expired Members", value: "4", trend: "Pending Renewal", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

const queueItems = [
  { name: 'Rahul Sharma', id: 'NHC-9842', dept: 'Cardiology', wait: '12 min', status: 'Waiting', statusColor: 'bg-amber-100 text-amber-700' },
  { name: 'Priya Venkatesh', id: 'NHC-4421', dept: 'Orthopedic', wait: 'Active', status: 'In-Consultation', statusColor: 'bg-rose-100 text-rose-700' },
  { name: 'Anwar Hussain', id: 'NHC-2109', dept: 'General Medicine', wait: '-', status: 'Discharged', statusColor: 'bg-slate-100 text-slate-500' },
  { name: 'Margaret D\'Souza', id: 'NHC-8812', dept: 'Pediatrics', wait: '5 min', status: 'Waiting', statusColor: 'bg-amber-100 text-amber-700' },
];

export default function Overview() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-sm text-slate-500 font-medium">Real-time metrics and operational status for Namma Health Network.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-sm transition-hover">
            <Calendar size={16} />
            Today: Oct 24, 2023
          </button>
          <Link 
            to="/admin/checkin/verify"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            New Registration
          </Link>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div 
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary/20 transition-all group"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{kpi.label}</p>
            <div className="flex items-end justify-between mb-2">
              <span className="text-xl font-display font-black text-slate-900 leading-none">{kpi.value}</span>
              <kpi.icon className={cn("transition-transform group-hover:scale-110", kpi.color)} size={20} />
            </div>
            <div className="flex items-center gap-1">
              {idx === 0 ? <TrendingUp size={10} className="text-blue-500" /> : <Activity size={10} className="text-slate-300" />}
              <span className="text-[10px] font-bold text-slate-500">{kpi.trend}</span>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Feed: Live Queue */}
        <section className="col-span-12 xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-primary" size={24} />
              <h3 className="text-lg font-display font-bold text-slate-900">Live Queue Status</h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">System Normal</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-50">
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4 text-center">ID / INFO</th>
                  <th className="px-6 py-4 text-center">Department</th>
                  <th className="px-6 py-4 text-center">Wait</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {queueItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs text-slate-500 font-medium">{item.id}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg border border-blue-100 uppercase tracking-wider">
                        {item.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-xs text-slate-400 font-medium">{item.wait}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest", item.statusColor)}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-slate-50/30 text-center border-t border-slate-50">
            <button className="text-xs font-bold text-primary hover:underline">View All Active Queues</button>
          </div>
        </section>

        {/* Side Panel: Alerts & Previews */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-rose-600" size={20} />
                <h3 className="font-display font-bold text-slate-900">Urgent Alerts</h3>
              </div>
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">2 New</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-rose-50/50 border-l-4 border-primary rounded-r-xl">
                <header className="flex justify-between items-start mb-1">
                  <p className="text-sm font-bold text-rose-900">High ER Volume</p>
                  <span className="text-[10px] text-slate-400 font-medium">2m ago</span>
                </header>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Emergency ward is at 95% capacity. Divert non-critical walk-ins to the South Wing facility immediately.
                </p>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Acknowledge Alert</button>
              </div>

              <div className="p-4 bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-xl">
                <header className="flex justify-between items-start mb-1">
                  <p className="text-sm font-bold text-indigo-900">System Maintenance</p>
                  <span className="text-[10px] text-slate-400 font-medium">45m ago</span>
                </header>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scheduled network optimization today at 11:30 PM. Offline mode will be active for 15 minutes.
                </p>
              </div>
            </div>
          </section>

          {/* Card Preview */}
          <section className="namma-card-gradient rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-lg font-display font-bold leading-none mb-1">Namma Card</h4>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-black">Master Record System</p>
                </div>
                <Users size={24} className="text-white/40" />
              </div>
              
              <div className="mb-6">
                <p className="text-[10px] text-white/60 uppercase font-black tracking-widest mb-1">System Health</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-black">99.8%</span>
                  <span className="text-[10px] bg-white/20 border border-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Uptime</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">Active Nodes</p>
                  <p className="text-xs font-bold">128 Clinical Centers</p>
                </div>
                <button className="bg-white text-primary px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                  Network Stats
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Analytics Hook */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div className="max-w-xl">
          <h3 className="text-2xl font-display font-black text-slate-900 mb-4">Analytics Integration</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
            Access deep-dive clinical data and patient outcome analytics from the primary Namma Health dataset. Synchronized across all 12 regional hubs.
          </p>
          <div className="flex gap-12">
            <div>
              <p className="text-xl font-display font-black text-slate-900">2.4M</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Registrations</p>
            </div>
            <div className="w-px h-8 bg-slate-200 self-center" />
            <div>
              <p className="text-xl font-display font-black text-slate-900">4.2/5</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-[480px] h-[240px] rounded-xl overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bbd38a69b4f2?q=80&w=800&auto=format&fit=crop" 
            alt="Analytics" 
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 flex flex-col justify-end">
            <h4 className="text-white font-bold text-sm">Real-time Patient Flow Heatmap</h4>
            <p className="text-[10px] text-white/60 font-medium">Updated 30 seconds ago</p>
          </div>
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-lg text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
