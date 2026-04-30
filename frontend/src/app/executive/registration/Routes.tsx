import React from 'react';
import { MapPin, Navigation, Eye, Clock, Route as RouteIcon, Info } from 'lucide-react';
import { MOCK_ROUTES } from '@/lib/constants';
import { RouteStop } from '@/lib/types';

export default function RoutesPage() {
  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Map Preview Section */}
      <section className="w-full relative h-[240px] lg:h-[320px] rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        <div className="absolute inset-0 bg-slate-100">
          <img 
            alt="Route Map" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTvZXdIPE3QXnV-CWKjFhGRCM1C0nB21OeJW2A2S4uaxJrpeer1QUYbDU_zBm8l5BrhRgq6wwT0kMO2RBNJdzxVmOnjgm8cwwFKson_r9jTcLmGY4OuWb2-lPUwZ0sUvF7Cc4DxgPMe2o5oJV7AlTCloC-JBhu3fRbWIA7K5Or9Cq6yIldUW0J1Af5DYffPk6deOZrkuewFQ-7hgQmQz4TwTmsXFvwYF-7THgaHyUZYsCCp5Y_S-6RTmSWwY9IvWE4Gc6VfunorP-W" 
          />
          {/* Floating Map Overlay */}
          <div className="absolute bottom-4 left-4 right-4 lg:left-6 lg:right-auto lg:w-80 glass-card p-4 rounded-xl shadow-lg border border-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Optimized Route</span>
              <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">4 STOPS</span>
            </div>
            <p className="text-on-surface font-display font-bold text-sm">Today's Field Coverage</p>
            <div className="mt-2 flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-1">
                <RouteIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium font-sans">18.4 mi</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium font-sans">42 mins travel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route Assignments List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-display text-title-lg text-on-surface">Route Assignments</h2>
          <button className="text-primary text-sm font-semibold flex items-center gap-1.5 hover:underline">
            <Info className="w-4 h-4" />
            Priority View
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MOCK_ROUTES.map((stop: RouteStop) => (
            <RouteCard key={stop.id} stop={stop} />
          ))}
        </div>
      </section>
    </div>
  );
}

function RouteCard({ stop }: { stop: RouteStop, key?: string }) {
  const isPriority = stop.priority === 'HIGH';
  
  return (
    <div className={`group bg-white rounded-2xl border p-6 flex flex-col gap-4 relative overflow-hidden transition-all hover:translate-y-[-2px] ${
      isPriority 
        ? 'border-primary/20 shadow-[0_4px_20px_rgba(184,0,53,0.08)]' 
        : 'border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
    }`}>
      {isPriority && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>
      )}
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${
            isPriority ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
          }`}>
            <span className="text-[10px] font-bold">STOP</span>
            <span className="text-lg font-black leading-none">{stop.stopNumber}</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-on-surface">{stop.patientName}</h3>
            <p className="text-slate-500 text-xs font-sans flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {stop.address}
            </p>
          </div>
        </div>
        {isPriority && (
          <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
            High Priority
          </span>
        )}
        {stop.priority === 'STANDARD' && (
          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
            Standard
          </span>
        )}
        {stop.priority === 'LOWER' && (
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
            Lower Priority
          </span>
        )}
      </div>

      <div className="flex items-center gap-6 py-2 border-y border-slate-100">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Time Slot</p>
          <p className="text-on-surface font-semibold text-sm">{stop.timeSlot}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Care Type</p>
          <p className="text-on-surface font-semibold text-sm">{stop.careType}</p>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button className={`flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          isPriority 
            ? 'bg-primary text-white hover:bg-rose-700 shadow-md shadow-primary/20' 
            : 'border border-primary/20 text-primary bg-primary/5 hover:bg-primary/10'
        }`}>
          <Navigation className="w-4 h-4" />
          {isPriority ? 'Start Navigation' : 'View Route'}
        </button>
        <button className="h-12 w-12 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <Eye className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
