import React from 'react';
import { 
  BarChart3, TrendingUp, PieChart as PieIcon, 
  Download, Filter, Calendar, ArrowUpRight,
  FileText, Activity, Users, MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';

const reportData = [
  { month: 'Jan', registrations: 400, target: 500 },
  { month: 'Feb', registrations: 600, target: 550 },
  { month: 'Mar', registrations: 800, target: 600 },
  { month: 'Apr', registrations: 750, target: 700 },
  { month: 'May', registrations: 950, target: 800 },
];

export default function ReportsAnalytics() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 font-medium mt-1">Strategic operational insights and performance trends</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-100 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Q2 2026</span>
          </div>
          <button className="bg-slate-800 text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Overview */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Registration vs Target</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs font-bold text-slate-400">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <span className="text-xs font-bold text-slate-400">Target</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                <Bar dataKey="registrations" fill="#E11D48" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="target" fill="#f1f5f9" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Territory Penetration */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Territory Penetration</h3>
          <div className="flex-1 space-y-6">
            {[
              { area: 'Yelahanka Block A', value: 85, color: 'bg-emerald-500' },
              { area: 'Hebbal West', value: 62, color: 'bg-indigo-500' },
              { area: 'Thanisandra', value: 45, color: 'bg-amber-500' },
              { area: 'Jakkur Lake', value: 92, color: 'bg-rose-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.area}</span>
                  <span className="text-sm font-black text-slate-800">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full`} 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Executive Performance', desc: 'Rankings, conversion and productivity', icon: Users },
          { title: 'Compliance Audit', desc: 'KYC status and fraud risk logs', icon: FileText },
          { title: 'Distribution Efficiency', desc: 'Physical card fulfillment times', icon: Truck },
        ].map((report, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer border-b-4 border-b-primary/5">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
              <report.icon className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">{report.title}</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">{report.desc}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all">
              Generate Report <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Truck(props: any) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10"/>
      <circle cx="7" cy="18" r="2"/>
      <circle cx="17" cy="18" r="2"/>
    </svg>
  );
}
