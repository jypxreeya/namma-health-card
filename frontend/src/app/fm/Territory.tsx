import React from 'react';
import { 
  Map as MapIcon, Navigation, Layers, MapPin, 
  Users, Activity, TrendingUp, ArrowUpRight,
  ChevronRight, Filter, Search, Plus
} from 'lucide-react';
import { motion } from 'motion/react';

const territories = [
  { id: 'T-01', name: 'Yelahanka Block A', execs: 4, leads: 120, coverage: '92%', status: 'OPTIMAL' },
  { id: 'T-02', name: 'Hebbal West', execs: 3, leads: 85, coverage: '78%', status: 'UNDERPERFORMING' },
  { id: 'T-03', name: 'Thanisandra', execs: 2, leads: 45, coverage: '45%', status: 'UNASSIGNED' },
  { id: 'T-04', name: 'Jakkur Lake Area', execs: 5, leads: 210, coverage: '98%', status: 'OPTIMAL' },
];

export default function TerritoryManagement() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Territory & Routes</h1>
          <p className="text-slate-500 font-medium mt-1">Deploy executives and optimize regional coverage</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Territory
          </button>
        </div>
      </div>

      {/* Main Map Visualization View */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Layers className="w-4 h-4 text-primary" />
              Satellite View
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <Activity className="w-4 h-4" />
              Live Executive Tracking
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search areas..." className="bg-transparent border-none outline-none text-xs font-medium" />
            </div>
            <button className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4">
          {/* Sidebar - Territory List */}
          <div className="border-r border-slate-50 p-6 space-y-4 overflow-y-auto max-h-[600px] custom-scrollbar">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Active Territories</p>
            {territories.map((t) => (
              <div key={t.id} className="p-4 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{t.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest ${
                    t.status === 'OPTIMAL' ? 'bg-emerald-50 text-emerald-600' : 
                    t.status === 'UNASSIGNED' ? 'bg-slate-100 text-slate-400' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Execs</p>
                    <p className="text-xs font-black text-slate-700">{t.execs}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Coverage</p>
                    <p className="text-xs font-black text-slate-700">{t.coverage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3 bg-slate-50 relative overflow-hidden group">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/77.5946,12.9716,12/1100x600?access_token=pk.mock')] bg-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"></div>
            
            {/* Custom Interactive Elements Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M200,200 L400,150 L500,300 L300,400 Z" fill="rgba(225, 29, 72, 0.1)" stroke="rgba(225, 29, 72, 0.4)" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="350" cy="250" r="8" fill="#E11D48" />
              <circle cx="350" cy="250" r="20" fill="none" stroke="#E11D48" strokeWidth="1" className="animate-ping" />
            </svg>

            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 w-48">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Zone Stats</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Leads Density</span>
                    <span className="text-xs font-bold text-slate-800">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">Heat Index</span>
                    <span className="text-xs font-bold text-primary">8.2</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-700">12 Execs Online</span>
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white">+8</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white/50">
              <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Balance Routes</button>
              <div className="w-px h-4 bg-slate-200"></div>
              <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Deploy Reserve</button>
              <div className="w-px h-4 bg-slate-200"></div>
              <button className="text-xs font-bold text-primary hover:underline">Recalculate Coverage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
