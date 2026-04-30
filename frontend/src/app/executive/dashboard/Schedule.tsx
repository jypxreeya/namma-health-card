import { useState } from 'react';
import { 
  Users, 
  PlusCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Info,
  Calendar as CalendarIcon,
  Search
} from 'lucide-react';
import { UPCOMING_APPOINTMENTS } from '@/lib/constants';
import { Appointment } from '@/lib/types';

export default function SchedulePage() {
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month');

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Hero / Quick Add */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <section className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200 space-y-6">
          <div>
            <h3 className="font-display text-title-lg text-on-surface mb-1">New Follow-up</h3>
            <p className="text-sm font-sans text-slate-500">Schedule a patient visit</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans ml-1">Patient Name</label>
              <div className="relative">
                <input className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-sans text-sm pl-4 pr-10" placeholder="Select lead or patient" type="text" />
                <Users className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-300" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans ml-1">Date</label>
                <input className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-sans text-sm px-4" type="date" defaultValue="2023-10-24" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans ml-1">Time</label>
                <input className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-sans text-sm px-4" type="time" defaultValue="09:30" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans ml-1">Purpose of Visit</label>
              <select className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-sans text-sm px-4 appearance-none bg-white">
                <option>Routine Check-up</option>
                <option>Post-Op Consultation</option>
                <option>Diagnostic Review</option>
                <option>Medication Adjustment</option>
              </select>
            </div>
            
            <button className="w-full h-12 bg-primary hover:bg-rose-700 text-white font-display font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-2">
              <PlusCircle className="w-5 h-5" />
              Confirm Schedule
            </button>
          </div>
        </section>

        {/* Stats Row */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Overdue */}
          <div className="bg-error-container/20 border border-error/10 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-error mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-sans">Overdue Tasks</span>
              </div>
              <p className="font-display text-5xl font-black text-error">08</p>
              <p className="text-sm font-sans font-medium text-error-container-text mt-1 text-on-error-container">Requires immediate clinical attention</p>
            </div>
            <div className="mt-6 flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Patient" />
              ))}
              <div className="w-10 h-10 rounded-full bg-error text-white text-[10px] flex items-center justify-center border-4 border-white font-bold shadow-sm">+6</div>
            </div>
          </div>
          
          {/* Capacity */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-500 font-sans">Today's Load</h4>
              <span className="text-xs font-black text-tertiary font-sans bg-tertiary-fixed px-3 py-1 rounded-full">75% Capacity</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-8">
              <div className="bg-tertiary h-full rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
            </div>
            <div className="mt-auto space-y-4">
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="text-slate-500 font-medium italic">Scheduled visits</span>
                <span className="font-bold text-on-surface">12</span>
              </div>
              <div className="flex justify-between items-center text-sm font-sans">
                <span className="text-slate-500 font-medium italic">Available slots</span>
                <span className="font-bold text-on-surface">4</span>
              </div>
            </div>
          </div>
          
          {/* Upcoming List */}
          <div className="sm:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-display text-title-lg font-bold">Next 24 Hours</h3>
              <button className="text-primary font-bold text-sm hover:underline font-display">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {UPCOMING_APPOINTMENTS.map((appt) => (
                <div key={appt.id} className="px-8 py-5 flex items-center gap-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold ${
                    appt.status === 'In 2h' ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <span className="text-[10px] uppercase font-black">Oct</span>
                    <span className="text-xl leading-none">24</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-bold text-on-surface group-hover:text-primary transition-colors">{appt.patientName}</p>
                    <p className="text-xs font-sans text-slate-500 mt-0.5">{appt.type} • {appt.time}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${
                    appt.status === 'In 2h' 
                      ? 'bg-secondary-container text-on-secondary-container' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {appt.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Calendar Card */}
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h3 className="font-display text-headline-md font-bold">October 2023</h3>
            <div className="flex gap-2">
              <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200 text-slate-500">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200 text-slate-500">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl">
            {(['Month', 'Week', 'Day'] as const).map((v) => (
              <button 
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                  view === v ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="py-4 text-center font-bold text-[10px] tracking-[0.2em] text-slate-400">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
              {/* Row 1 - Previous Month */}
              {[26, 27, 28, 29, 30].map(d => (
                <div key={d} className="border-b border-r border-slate-50 p-4 text-slate-300 font-sans text-sm">{d}</div>
              ))}
              <div className="border-b border-r border-slate-50 p-4 font-bold text-on-surface text-sm">1</div>
              <div className="border-b border-slate-50 p-4 font-bold text-on-surface text-sm">2</div>
              
              {/* Other Days (Simplified Grid) */}
              {Array.from({length: 14}).map((_, i) => (
                <div key={i} className="border-b border-r border-slate-50 p-4">
                  <span className="text-sm font-bold text-slate-400">{i + 3}</span>
                </div>
              ))}
              
              {/* Row 4 - Active Area */}
              <div className="border-b border-r border-slate-50 p-4 font-bold text-on-surface">
                <span className="text-sm">22</span>
                <div className="mt-3 p-2.5 bg-error-container/30 border border-error/20 rounded-xl text-error text-[10px] font-bold leading-tight flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>Missed: James L.</span>
                </div>
              </div>
              <div className="border-b border-r border-slate-50 p-4 font-bold text-slate-400 text-sm">23</div>
              
              {/* Current Day */}
              <div className="border-b border-r border-slate-50 p-4 bg-primary/5">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white text-center leading-8 text-xs font-bold shadow-md">24</span>
                <div className="mt-3 space-y-1.5">
                  <CalendarDayEvent color="bg-tertiary" time="09:30" label="Sarah J." />
                  <CalendarDayEvent color="bg-primary" time="11:15" label="Robert M." />
                  <CalendarDayEvent color="bg-slate-400" time="14:00" label="Elena V." />
                </div>
              </div>
              
              {/* Filling out the rest */}
              {Array.from({length: 11}).map((_, i) => (
                <div key={i} className="border-b border-r border-slate-50 p-4">
                  <span className="text-sm font-bold text-slate-400">{i + 25 <= 31 ? i + 25 : i - 6}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarDayEvent({ color, time, label }: { color: string, time: string, label: string }) {
  return (
    <div className="p-2 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-on-surface text-[10px] font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
      <span className={`w-2 h-2 shrink-0 rounded-full ${color}`}></span>
      <span className="truncate">{time} {label}</span>
    </div>
  );
}
