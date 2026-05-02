/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Filter, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Users,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const pieData = [
  { name: 'Clinical', value: 45, color: '#af101a' },
  { name: 'Radiology', value: 25, color: '#3b82f6' },
  { name: 'Lab', value: 20, color: '#10b981' },
  { name: 'ER', value: 10, color: '#f59e0b' },
];

export default function UtilizationReports() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex gap-2 text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">
            <span>Administration</span>
            <span className="text-primary opacity-30">/</span>
            <span className="text-primary">Utilization Statistics</span>
          </nav>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight leading-none mb-2">Network Performance</h2>
          <p className="text-sm text-slate-500 font-medium">Monitoring clinic efficiency and budget utilization across the node.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-600 shadow-sm transition-all outline-none">
            <Calendar size={16} />
            Oct 2023 - Nov 2023
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl transition-all outline-none">
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </header>

      {/* Primary KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Claims', value: '4,281', trend: '+12.5%', isUp: true, icon: Target },
          { label: 'Network Load', value: '78%', trend: '-4.2%', isUp: false, icon: Activity },
          { label: 'Unique Visits', value: '1,102', trend: '+18.1%', isUp: true, icon: Users },
          { label: 'Claim Approval', value: '96.4%', trend: '+0.4%', isUp: true, icon: TrendingUp },
        ].map((kpi, idx) => (
          <motion.div 
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-primary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <kpi.icon size={20} />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-full border",
                kpi.isUp ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
              )}>
                {kpi.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <p className="text-2xl font-display font-black text-slate-900 leading-none">{kpi.value}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Chart Area */}
        <section className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-display font-black text-slate-900 tracking-tight">Claim Volume Trends</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-slate-100 text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest">Growth</button>
              <button className="px-3 py-1.5 bg-white text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-slate-100">Volume</button>
            </div>
          </div>
          
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#af101a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#af101a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }} 
                />
                <Area type="monotone" dataKey="value" stroke="#af101a" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Breakdown Panel */}
        <section className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-display font-black text-slate-900 tracking-tight mb-8 self-start">Benefit Allocation</h3>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full mt-8 space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Regional Table */}
      <section className="bg-slate-900 text-white rounded-3xl p-10 overflow-hidden relative shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-2xl font-display font-black mb-1">Regional Distribution</h3>
              <p className="text-xs text-slate-400 font-medium">Efficiency scores by healthcare node location.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
              <Filter size={16} /> Filter Region
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { location: 'Bengaluru Central', efficiency: '98.2%', volume: '1.2k', status: 'Optimal' },
              { location: 'Mysuru Urban', efficiency: '91.5%', volume: '0.8k', status: 'Warning' },
              { location: 'Hubballi North', efficiency: '94.8%', volume: '1.1k', status: 'Good' },
            ].map((node) => (
              <div key={node.location} className="border-l border-white/10 pl-8">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{node.location}</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-display font-black leading-none">{node.efficiency}</span>
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded uppercase font-black tracking-widest",
                    node.status === 'Optimal' ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  )}>
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                  <TrendingUp size={12} />
                  {node.volume} claims this period
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="value" fill="#fff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
