import React from 'react';
import { 
  CreditCard, Smartphone, Mail, MessageCircle, 
  RefreshCcw, AlertCircle, CheckCircle2, Truck,
  Plus, Search, Filter, ArrowUpRight, BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

const distributionData = [
  { id: 'DIST-902', patient: 'Suresh Kumar', type: 'Physical Card', status: 'SHIPPED', date: '2h ago', executive: 'Kiran R.' },
  { id: 'DIST-901', patient: 'Meenakshi Iyer', type: 'Digital Only', status: 'DELIVERED', date: '4h ago', executive: 'Priya S.' },
  { id: 'DIST-900', patient: 'Ramesh Singh', type: 'Physical Card', status: 'PENDING', date: '5h ago', executive: 'Anil K.' },
  { id: 'DIST-899', patient: 'Anita B.', type: 'Digital Only', status: 'FAILED_WHATSAPP', date: '1d ago', executive: 'Meera V.' },
];

export default function CardDistribution() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Card Distribution Oversight</h1>
          <p className="text-slate-500 font-medium mt-1">Monitor physical fulfillment and digital delivery status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Retry Failed Deliveries
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Generated', value: '4,284', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Physical Shipped', value: '1,280', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'WhatsApp Delivered', value: '2,940', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Delivery Failures', value: '12', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
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
          <h3 className="text-xl font-bold text-slate-800">Fulfillment Queue</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search Delivery..." className="bg-transparent border-none outline-none text-xs font-medium" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-4">Distribution ID</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Card Type</th>
                <th className="px-6 py-4">Delivery Status</th>
                <th className="px-6 py-4">Executive</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {distributionData.map((dist) => (
                <tr key={dist.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-5 text-sm font-bold text-slate-800">{dist.id}</td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">{dist.patient}</td>
                  <td className="px-6 py-5">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      {dist.type === 'Physical Card' ? <CreditCard className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                      {dist.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest ${
                      dist.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600' : 
                      dist.status === 'SHIPPED' ? 'bg-blue-50 text-blue-600' : 
                      dist.status === 'FAILED_WHATSAPP' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {dist.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-bold uppercase tracking-wider">{dist.executive}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-primary hover:underline">View Details</button>
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
