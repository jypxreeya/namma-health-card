/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  Settings, 
  ArrowRight, 
  ArrowLeft, 
  Clock,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../../components/ui/Stepper';
import { cn } from '../../lib/utils';

const departments = [
  { id: 'GP', name: 'General Medicine', icon: Stethoscope, wait: '10 min', staff: 'Dr. Ramesh' },
  { id: 'CD', name: 'Cardiology', icon: HeartPulse, wait: '45 min', staff: 'Dr. Arjun' },
  { id: 'OP', name: 'Orthopedic', icon: Activity, wait: '20 min', staff: 'Dr. Kavitha' },
  { id: 'PD', name: 'Pediatrics', icon: UserCheck, wait: '5 min', staff: 'Dr. Sarah' },
];

export default function DepartmentAssignment() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleComplete = () => {
    if (selected) navigate('/checkin/success');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Stepper currentStep={3} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
      >
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mb-1">Route to Department</h2>
            <p className="text-sm text-slate-500 font-medium">Assign a clinical unit for consultation.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue Load</p>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">Moderate</span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {departments.map((dept) => {
            const isSelected = selected === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelected(dept.id)}
                className={cn(
                  "p-6 flex items-center gap-6 rounded-2xl border-2 transition-all group overflow-hidden relative",
                  isSelected 
                    ? "border-primary bg-white shadow-xl shadow-primary/5" 
                    : "border-slate-50 bg-slate-50 hover:border-slate-200 hover:bg-white"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                  isSelected ? "bg-primary text-white" : "bg-white text-slate-400 shadow-sm group-hover:text-primary"
                )}>
                  <dept.icon size={28} />
                </div>
                
                <div className="text-left flex-1">
                  <p className={cn("font-bold text-sm mb-1", isSelected ? "text-slate-900" : "text-slate-700")}>{dept.name}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Clock size={12} />
                      {dept.wait} Wait
                    </div>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dept.staff}</p>
                  </div>
                </div>

                {isSelected && (
                  <motion.div 
                    layoutId="dept-check"
                    className="absolute -right-2 -top-2 w-12 h-12 bg-primary rotate-45 flex items-end justify-center pb-1"
                  >
                    <div className="-rotate-45 mb-1 mr-1 text-white">
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        <section className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group mb-10">
          <div className="relative z-10">
            <h4 className="text-sm font-black text-white/40 uppercase tracking-widest mb-4">Patient Availability Check</h4>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <Settings size={20} />
              </div>
              <div>
                <p className="text-sm font-bold mb-1">Pre-Check Success</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No active insurance conflicts detected. Digital token will be authorized immediately upon confirmation.
                </p>
              </div>
            </div>
          </div>
          <HeartPulse className="absolute -right-8 -bottom-8 text-white/5 group-hover:scale-110 transition-transform duration-1000" size={160} />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-slate-50">
          <button 
            onClick={() => navigate('/checkin/beneficiary')}
            className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            disabled={!selected}
            onClick={handleComplete}
            className={cn(
              "flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg",
              selected 
                ? "bg-primary text-white shadow-primary/20 hover:scale-105 active:scale-95" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            Confirm & Issue Token
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
