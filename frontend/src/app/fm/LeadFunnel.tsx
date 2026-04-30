import React from 'react';
import { 
  PieChart as PieIcon, TrendingUp, Users, Target, 
  ArrowUpRight, ArrowDownRight, Clock, Activity,
  Filter, Search, Calendar, ChevronRight, BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, FunnelChart, Funnel, LabelList,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';

const funnelData = [
  { value: 1200, name: 'Total Leads', fill: '#6366f1' },
  { value: 850, name: 'Field Visits', fill: '#8b5cf6' },
  { value: 520, name: 'Qualified', fill: '#a855f7' },
  { value: 310, name: 'Interested', fill: '#d946ef' },
  { value: 142, name: 'Converted', fill: '#f43f5e' },
];

const performanceByExec = [
  { name: 'Kiran R.', converted: 45, pending: 20 },
  { name: 'Priya S.', converted: 38, pending: 25 },
  { name: 'Anil K.', converted: 32, pending: 30 },
  { name: 'Meera V.', converted: 28, pending: 15 },
  { name: 'Suresh M.', converted: 22, pending: 18 },
];

export default function LeadFunnel() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Lead Funnel & Follow-Up</h1>
          <p className="text-slate-500 font-medium mt-1">Analyze conversion lifecycle and pipeline health</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-100 px-5 py-2.5 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funnel Visualization */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Conversion Funnel</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold">
                <TrendingUp className="w-3 h-3" />
                +14% vs Last Month
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <FunnelChart>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#64748b" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnel Metrics */}
        <div className="space-y-6">
          {[
            { label: 'Leads to Visit', value: '71%', trend: 'up', change: '+2.4%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Visit to Interest', value: '61%', trend: 'down', change: '-1.2%', color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Interest to Converted', value: '45%', trend: 'up', change: '+3.1%', color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'Avg. Days to Convert', value: '4.2', trend: 'neutral', change: 'Optimal', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((metric, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{metric.label}</p>
                <h3 className={`text-2xl font-black ${metric.color} mt-1`}>{metric.value}</h3>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                metric.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {metric.change}
              </div>
            </div>
          ))}
          
          <div className="bg-slate-800 p-6 rounded-3xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-rose-400" />
              <h4 className="font-bold text-sm">Monthly Goal</h4>
            </div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-black">142/200</span>
              <span className="text-xs font-bold text-slate-400">71%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-rose-400 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-8">Executive-wise Pipeline</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceByExec} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                width={100}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="converted" stackId="a" fill="#E11D48" radius={[4, 0, 0, 4]} barSize={24} />
              <Bar dataKey="pending" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
