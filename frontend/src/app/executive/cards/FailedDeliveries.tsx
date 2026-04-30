import React from 'react';
import { 
  AlertTriangle, 
  MapPinOff, 
  UserMinus, 
  CalendarClock, 
  RefreshCcw, 
  Search, 
  Filter, 
  Edit3, 
  ArrowRight,
  ChevronDown,
  Plus,
  Shield,
  Wifi
} from 'lucide-react';
import { motion } from 'motion/react';

const failedItems = [
  { 
    id: 'VH-9920-8841-0021', 
    name: 'James T. Richardson', 
    reason: 'Address Not Found', 
    priority: 'Urgent', 
    time: 'Oct 24, 2023 • 14:20 PM',
    address: '4821 Oakwood Avenue, Suite 4B, Los Angeles, CA 90004',
    note: 'Attempted delivery at 2:20 PM. Complex gate code provided \'9921\' did not work. Building security refused entry without direct resident confirmation.'
  },
  { 
    id: 'VH-1102-3349-9982', 
    name: 'Elena Rodriguez-Santos', 
    reason: 'Recipient Not Available', 
    priority: 'Standard', 
    time: 'Oct 25, 2023 • 09:15 AM',
    address: '1290 Skyline Boulevard, Apt 1201, San Francisco, CA 94132',
    note: 'Recipient was not home. Signature required for medical ID card. Left a \'we missed you\' slip for rescheduling. Security guard mentions resident is away until Monday.'
  }
];

export default function FailedDeliveries() {
  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Delivery Exceptions</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-800">Failed Deliveries</h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed font-medium">
            Review and resolve address issues or delivery attempts for physical health cards. Update coordinates to re-trigger delivery.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="h-14 px-8 rounded-2xl border border-slate-200 bg-white text-slate-600 font-display font-bold uppercase tracking-tighter text-sm hover:bg-slate-50 transition-all flex items-center gap-3">
            <Filter className="w-5 h-5 text-slate-400" />
            Filter List
          </button>
          <button className="h-14 px-8 rounded-2xl bg-primary text-white font-display font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] flex items-center gap-3 group">
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
            Retry All
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Pending Resolution', value: '142', change: 'AL-9.2', icon: AlertTriangle },
          { label: 'Address Mismatches', value: '89', change: '62%', icon: MapPinOff },
          { label: 'Scheduled Retries', value: '34', change: 'Active', icon: CalendarClock }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-primary transition-all">
            <div className="">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-primary flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                <stat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</h3>
            </div>
            <div className="flex items-end justify-between mt-4">
              <span className="text-4xl font-display font-bold text-slate-800 tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-bold px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100 tracking-widest">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {failedItems.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden hover:border-primary transition-all group"
          >
            <div className="flex flex-col xl:flex-row">
              <div className="xl:w-80 bg-slate-50 p-10 flex flex-col items-center justify-center border-r border-slate-100">
                <div className="w-56 h-36 bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl mb-6">
                   <div className="flex justify-between items-start">
                     <Wifi className="w-6 h-6 text-primary" />
                     <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">Health ID</span>
                   </div>
                   <div>
                     <p className="text-[8px] uppercase tracking-[0.2em] text-primary font-bold mb-1">Patient Reference</p>
                     <p className="font-mono text-xs tracking-widest text-white/80">{item.id}</p>
                   </div>
                </div>
                <span className="font-display font-bold text-slate-800 text-center uppercase tracking-tight text-xl">
                  {item.name}
                </span>
              </div>

              <div className="flex-1 p-8 xl:p-12">
                <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full flex items-center gap-2.5 bg-rose-50 border border-rose-100 text-rose-600 font-bold text-[10px] uppercase tracking-widest">
                      {item.reason === 'Address Not Found' ? <MapPinOff className="w-3.5 h-3.5" /> : <UserMinus className="w-3.5 h-3.5" />}
                      {item.reason}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${item.priority === 'Urgent' ? 'bg-rose-500' : 'bg-slate-300'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.priority === 'Urgent' ? 'text-rose-500' : 'text-slate-400'}`}>
                      {item.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-l-2 border-primary pl-4 py-0.5">Reported Address</h4>
                    <div className="space-y-1.5">
                      <p className="text-xl font-bold text-slate-800 leading-tight">{item.address.split(',')[0]}</p>
                      <p className="text-sm text-slate-400 font-medium uppercase tracking-widest leading-relaxed">{item.address.split(',').slice(1).join(',')}</p>
                    </div>
                    <button className="flex items-center gap-2.5 text-primary font-bold text-[10px] uppercase tracking-widest hover:text-primary-dark transition-colors pt-2 group">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <Edit3 className="w-4 h-4" />
                      </div>
                      Edit Address
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-l-2 border-slate-200 pl-4 py-0.5">Field Agent Notes</h4>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-sm text-slate-500 leading-relaxed font-medium">
                      "{item.note}"
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-50 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(n => (
                        <div key={n} className="w-10 h-10 rounded-xl border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?img=${n + 25}`} alt="Staff" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-xl border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">+3</div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Assignment Flow</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="h-14 px-6 rounded-xl text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-all">Archive Case</button>
                    <button className={`h-14 px-8 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-[0.98] flex items-center gap-3 ${
                      item.priority === 'Urgent' ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-slate-900 text-white hover:bg-black'
                    }`}>
                      {item.priority === 'Urgent' ? <RefreshCcw className="w-4 h-4" /> : <CalendarClock className="w-4 h-4" />}
                      {item.priority === 'Urgent' ? 'Retry Delivery' : 'Reschedule'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center py-8">
        <button className="group flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-primary transition-all">Load Previous Records</span>
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:border-primary transition-all">
            <ChevronDown className="w-6 h-6 text-slate-300 group-hover:text-primary transition-all" />
          </div>
        </button>
      </div>

      <button className="fixed bottom-24 right-8 lg:bottom-12 lg:right-12 w-16 h-16 bg-primary text-white rounded-3xl shadow-xl shadow-primary/30 flex items-center justify-center hover:bg-primary-dark hover:scale-105 transition-all z-50">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
