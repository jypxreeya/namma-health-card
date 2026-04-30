import React from 'react';
import { 
  Users, UserCheck, ClipboardCheck, AlertCircle, 
  TrendingUp, CreditCard, XCircle, ShieldAlert,
  ArrowUpRight, ArrowDownRight, Activity, MapPin,
  Calendar, CheckCircle2, Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const kpiData = [
  { label: 'Team Visits Today', value: '142', change: '+12%', trend: 'up', icon: Activity, color: 'bg-blue-500' },
  { label: 'Registrations Today', value: '58', change: '+8%', trend: 'up', icon: UserCheck, color: 'bg-emerald-500' },
  { label: 'Active Executives', value: '14/15', change: '93%', trend: 'neutral', icon: Users, color: 'bg-indigo-500' },
  { label: 'Pending Follow-ups', value: '24', change: '-5%', trend: 'up', icon: Clock, color: 'bg-amber-500' },
  { label: 'Conversion Rate', value: '42.5%', change: '+3.2%', trend: 'up', icon: TrendingUp, color: 'bg-rose-500' },
  { label: 'Cards Distributed', value: '1,284', change: '+124', trend: 'up', icon: CreditCard, color: 'bg-violet-500' },
  { label: 'Failed Registrations', value: '03', change: '-2', trend: 'up', icon: XCircle, color: 'bg-slate-700' },
  { label: 'Compliance Exceptions', value: '07', change: 'Action Required', trend: 'down', icon: ShieldAlert, color: 'bg-orange-500' },
];

const registrationTrends = [
  { day: 'Mon', count: 42 },
  { day: 'Tue', count: 55 },
  { day: 'Wed', count: 48 },
  { day: 'Thu', count: 70 },
  { day: 'Fri', count: 62 },
  { day: 'Sat', count: 85 },
  { day: 'Sun', count: 40 },
];

const teamPerformance = [
  { name: 'Kiran R.', registrations: 85, visits: 120, conversion: 71 },
  { name: 'Priya S.', registrations: 72, visits: 110, conversion: 65 },
  { name: 'Anil K.', registrations: 68, visits: 95, conversion: 72 },
  { name: 'Meera V.', registrations: 60, visits: 105, conversion: 57 },
  { name: 'Suresh M.', registrations: 55, visits: 90, conversion: 61 },
];

const funnelData = [
  { name: 'Leads', value: 1000, fill: '#6366f1' },
  { name: 'Visits', value: 650, fill: '#8b5cf6' },
  { name: 'Interested', value: 420, fill: '#a855f7' },
  { name: 'Converted', value: 280, fill: '#d946ef' },
];

export default function FMDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Regional Command Centre</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time oversight for <span className="text-primary font-bold">North Bangalore</span> Operations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-600">May 2026 (Period Q2)</span>
          </div>
          <button className="bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2">
            Generate Report
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${kpi.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-inner`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                kpi.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {kpi.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                {kpi.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Trends Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Registration Trends</h3>
              <p className="text-sm text-slate-500 font-medium">Daily conversion performance across the region</p>
            </div>
            <select className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D48" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#E11D48', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#E11D48" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Funnel */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-1">Operational Funnel</h3>
          <p className="text-sm text-slate-500 font-medium mb-8">Lead conversion efficiency</p>
          
          <div className="flex-1 flex flex-col justify-center gap-6">
            {funnelData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </div>
                <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / 1000) * 100}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Avg.</p>
                <p className="text-lg font-bold text-slate-800">28% <span className="text-emerald-500 text-xs">+2.4%</span></p>
              </div>
              <button className="p-3 bg-slate-50 text-primary rounded-2xl hover:bg-slate-100 transition-all">
                <Activity className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Executive Leaderboard */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Top Performing Executives</h3>
            <button className="text-sm font-bold text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {teamPerformance.map((exec, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-white transition-all shadow-inner">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{exec.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">Territory: Sector {i + 1}</p>
                </div>
                <div className="text-right flex items-center gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Regs</p>
                    <p className="text-sm font-bold text-slate-700">{exec.registrations}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conv %</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <p className="text-sm font-black text-slate-800">{exec.conversion}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Operational Intervention */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Priority Interventions</h3>
          <div className="flex-1 space-y-4">
            {[
              { type: 'compliance', title: 'Missing KYC Documents', desc: '4 registrations in Yelahanka pending Aadhaar', time: '10m ago', priority: 'High' },
              { type: 'failed', title: 'Card Generation Failure', desc: 'API timeout for Patient NHC-10294', time: '45m ago', priority: 'Medium' },
              { type: 'duplicate', title: 'Duplicate Match Detected', desc: 'Mobile 98765xxxx linked to multiple leads', time: '2h ago', priority: 'High' },
              { type: 'inactive', title: 'Executive Inactivity', desc: 'Anil K. has no GPS signal for 2 hours', time: '5m ago', priority: 'Critical' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-3xl bg-slate-50/50 border border-slate-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  alert.priority === 'Critical' ? 'bg-rose-500 text-white' : 
                  alert.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800 text-sm">{alert.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{alert.desc}</p>
                </div>
                <button className="self-center p-2 text-slate-300 hover:text-primary transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-slate-800 text-white rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all active:scale-[0.98]">
            Enter Compliance Audit Hub
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
