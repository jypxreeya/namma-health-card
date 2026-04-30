import React from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  MoreVertical, 
  Share2, 
  Truck, 
  MessageSquare,
  BadgeCheck,
  Wallet,
  Package,
  Activity,
  History,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

const cards = [
  { name: 'Johnathan Doe', id: '#VX-99201', cardId: '8829-****-2019', date: 'Oct 12, 2023', status: 'Delivered', region: 'Central Metro', color: 'primary' },
  { name: 'Amara Singh', id: '#VX-99185', cardId: '4412-****-3032', date: 'Oct 14, 2023', status: 'Physical Pending', region: 'Western Hills', color: 'amber' },
  { name: 'Marcus Knight', id: '#VX-99150', cardId: '2290-****-0118', date: 'Oct 15, 2023', status: 'Digital Shared', region: 'Southern Port', color: 'blue' },
  { name: 'Elena Lopez', id: '#VX-99122', cardId: '1104-****-9941', date: 'Oct 16, 2023', status: 'Delivered', region: 'Northern Ridge', color: 'emerald' },
];

export default function CardRegistry() {
  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Registry</span>
          </nav>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800">Patient Records</h1>
          <p className="text-slate-500 max-w-xl text-lg leading-relaxed font-medium">
            Manage patient health cards and registration status across the regional network.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="h-14 px-8 rounded-2xl bg-primary text-white font-display font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] flex items-center gap-3 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            New Registration
          </button>
          <button className="h-14 px-8 rounded-2xl border border-slate-200 bg-white text-slate-600 font-display font-bold hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-[0.98]">
            <Download className="w-5 h-5 text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
            Export Data
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex flex-col xl:flex-row gap-8 justify-between">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, patient ID, or region..."
              className="w-full h-14 pl-14 pr-6 bg-slate-50 rounded-2xl border border-slate-200 focus:border-primary focus:bg-white focus:ring-0 transition-all text-lg outline-none text-slate-700 placeholder:text-slate-300 font-medium"
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {['All Patients', 'Delivered', 'Pending', 'Digital Only'].map((tab, i) => (
              <button 
                key={tab}
                className={`whitespace-nowrap px-6 h-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                  i === 0 ? 'bg-primary text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Patient</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Reference ID</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Registration</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400">Region</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cards.map((card, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-primary font-bold text-sm shadow-sm">
                        {card.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-lg font-bold text-slate-800 leading-none mb-1.5">{card.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {card.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono text-sm text-slate-500 font-medium">{card.cardId}</td>
                  <td className="px-8 py-6 text-slate-600 font-bold">{card.date}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest gap-2.5 border ${
                      card.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      card.status === 'Physical Pending' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        card.status === 'Delivered' ? 'bg-emerald-500' : 
                        card.status === 'Physical Pending' ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'
                      }`} />
                      {card.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-bold">{card.region}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-all">
                      <button className="p-3 hover:bg-slate-100 hover:text-primary rounded-xl transition-all"><Truck className="w-5 h-5" /></button>
                      <button className="p-3 hover:bg-slate-100 hover:text-primary rounded-xl transition-all"><MessageSquare className="w-5 h-5" /></button>
                      <button className="p-3 hover:bg-slate-100 hover:text-primary rounded-xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 1-10 of 1,284 patients</span>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-300 hover:bg-slate-50 hover:text-slate-500 transition-all"><ChevronLeft className="w-5 h-5" /></button>
            <button className="w-10 h-10 rounded-xl bg-primary text-white font-bold shadow-md">1</button>
            <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 font-bold hover:bg-slate-100 transition-all">2</button>
            <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 font-bold hover:bg-slate-100 transition-all">3</button>
            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-300 hover:bg-slate-50 hover:text-slate-500 transition-all"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-primary rounded-[32px] text-white shadow-lg shadow-primary/20 relative overflow-hidden group">
          <div className="relative z-10">
            <Wallet className="w-10 h-10 mb-6 text-white" />
            <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mb-2">Card Inventory</div>
            <div className="text-4xl font-display font-bold tracking-tight mb-2">240 Units</div>
            <p className="text-white/70 text-sm leading-relaxed font-medium">Physical health cards available for instant issue.</p>
          </div>
          <Package className="absolute right-6 bottom-6 w-20 h-20 text-white/5 rotate-12" />
        </div>

        <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col justify-between hover:border-primary transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-emerald-600 font-bold flex items-center gap-1.5 text-[10px] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5" />
              +12%
            </span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Delivery Rate</div>
            <div className="text-4xl font-display font-bold text-slate-800 mb-2 tracking-tight">84.2%</div>
            <p className="text-sm font-medium text-slate-400">Card delivery success across regional sectors.</p>
          </div>
        </div>

        <div className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm flex flex-col justify-between hover:border-primary transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
              <History className="w-7 h-7" />
            </div>
            <span className="text-primary font-bold flex items-center gap-1.5 text-[10px] bg-rose-50 px-4 py-2 rounded-full border border-rose-100 uppercase tracking-widest">
              <History className="w-3.5 h-3.5" />
              -1.2d
            </span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Sync Time</div>
            <div className="text-4xl font-display font-bold text-slate-800 mb-2 tracking-tight">3.2 Days</div>
            <p className="text-sm font-medium text-slate-400">Average time for digital medical record sync.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
