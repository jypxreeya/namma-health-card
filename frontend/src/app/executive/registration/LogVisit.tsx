import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Timer, 
  XCircle, 
  Check, 
  ChevronDown, 
  Save, 
  BarChart3 
} from 'lucide-react';

export default function LogVisitPage() {
  const [outcome, setOutcome] = useState<'Registered' | 'Follow-up' | 'Refused'>('Registered');
  const [vitals, setVitals] = useState({
    bp: true,
    hr: true,
    ox: false,
    temp: false
  });

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto w-full space-y-8">
      {/* Header Section with Patient Context */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col justify-center">
          <h2 className="font-display text-headline-md text-on-surface mb-2">Patient Visit Summary</h2>
          <p className="font-sans text-secondary text-sm">Logged by Health Network Admin • Global Operations</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-sans text-[11px] font-bold">In-Person Visit</span>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-sans text-[11px] font-bold">ID: PN-88219</span>
          </div>
        </div>
        
        {/* Conversion Status Widget */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-3">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg text-primary mb-1">Pending</h3>
          <p className="font-sans text-[11px] text-secondary uppercase tracking-widest font-bold">Conversion Status</p>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3"></div>
          </div>
        </div>
      </section>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Visit Outcome */}
        <section className="md:col-span-12 bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <label className="font-display font-bold text-sm text-on-surface mb-6 block">Visit Outcome</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <OutcomeButton 
              active={outcome === 'Registered'} 
              onClick={() => setOutcome('Registered')}
              icon={<CheckCircle2 />}
              label="Registered"
              activeColor="border-primary bg-primary/5 text-primary"
            />
            <OutcomeButton 
              active={outcome === 'Follow-up'} 
              onClick={() => setOutcome('Follow-up')}
              icon={<Timer />}
              label="Follow-up Required"
              activeColor="border-amber-400 bg-amber-50 text-amber-700"
            />
            <OutcomeButton 
              active={outcome === 'Refused'} 
              onClick={() => setOutcome('Refused')}
              icon={<XCircle />}
              label="Refused"
              activeColor="border-slate-400 bg-slate-50 text-slate-700"
            />
          </div>
        </section>

        {/* Vitals Checklist */}
        <section className="md:col-span-12 lg:col-span-5 bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-full">
          <label className="font-display font-bold text-sm text-on-surface mb-6 block">Vitals Captured</label>
          <div className="space-y-4">
            <CheckboxItem 
              label="Blood Pressure" 
              checked={vitals.bp} 
              onChange={() => setVitals({...vitals, bp: !vitals.bp})} 
            />
            <CheckboxItem 
              label="Heart Rate (BPM)" 
              checked={vitals.hr} 
              onChange={() => setVitals({...vitals, hr: !vitals.hr})} 
            />
            <CheckboxItem 
              label="Oxygen Saturation" 
              checked={vitals.ox} 
              onChange={() => setVitals({...vitals, ox: !vitals.ox})} 
            />
            <CheckboxItem 
              label="Temperature" 
              checked={vitals.temp} 
              onChange={() => setVitals({...vitals, temp: !vitals.temp})} 
            />
          </div>
        </section>

        {/* Notes */}
        <section className="md:col-span-12 lg:col-span-7 bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-full">
          <label className="font-display font-bold text-sm text-on-surface mb-6 block">Clinical Notes</label>
          <textarea 
            className="w-full h-[180px] border border-slate-200 rounded-xl p-4 font-sans text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400 resize-none" 
            placeholder="Describe the patient's reaction, clinical observations, and executive summary of the visit..."
          ></textarea>
        </section>

        {/* Next Step */}
        <section className="md:col-span-12 bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <label className="font-display font-bold text-sm text-on-surface mb-6 block">Next Step</label>
          <div className="relative">
            <select className="w-full min-h-[56px] appearance-none border border-slate-200 rounded-xl px-4 font-sans text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none bg-white font-medium text-on-surface">
              <option>Schedule Specialist Consult</option>
              <option>Direct Enrollment into Care Program</option>
              <option>Pharmacy Medication Review</option>
              <option>Home Health Visit (Tier 2)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 mb-20">
        <button className="flex-1 h-[56px] bg-primary text-white rounded-xl font-display font-bold text-sm hover:bg-rose-700 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Finalize & Sync Visit
        </button>
        <button className="sm:w-48 h-[56px] border border-primary text-primary font-display font-bold text-sm rounded-xl hover:bg-primary/5 transition-all">
          Save Draft
        </button>
      </div>
    </div>
  );
}

function OutcomeButton({ active, onClick, icon, label, activeColor }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, activeColor: string }) {
  return (
    <button 
      onClick={onClick}
      className={`min-h-[56px] border-2 rounded-xl flex items-center justify-center gap-2 font-display font-bold text-sm transition-all ${
        active 
          ? `shadow-sm ${activeColor}` 
          : 'border-slate-200 hover:border-primary/20 text-on-surface-variant bg-white'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      {label}
    </button>
  );
}

function CheckboxItem({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center gap-4 min-h-[48px] cursor-pointer group">
      <div 
        onClick={onChange}
        className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
          checked ? 'bg-primary border-primary' : 'bg-white border-slate-300 group-hover:border-primary/40'
        }`}
      >
        {checked && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className="font-sans text-sm font-medium text-on-surface">{label}</span>
    </label>
  );
}
