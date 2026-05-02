/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { User, Users, Check, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../../components/ui/Stepper';
import { cn } from '../../lib/utils';

const beneficiaries = [
  { id: 'B1', name: 'Arjun Mehta', relation: 'Self/Primary', age: 42, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop' },
  { id: 'B2', name: 'Sarita Mehta', relation: 'Spouse', age: 38, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop' },
  { id: 'B3', name: 'Aarav Mehta', relation: 'Son', age: 12, avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?q=80&w=100&h=100&auto=format&fit=crop' },
];

export default function BeneficiarySelection() {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) navigate('/checkin/department');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Stepper currentStep={2} />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
      >
        <header className="mb-10 text-center">
          <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mb-2">Select Beneficiary</h2>
          <p className="text-sm text-slate-500 font-medium">Which family member is visiting the clinic today?</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {beneficiaries.map((person) => {
            const isSelected = selected === person.id;
            return (
              <button
                key={person.id}
                onClick={() => setSelected(person.id)}
                className={cn(
                  "relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group",
                  isSelected 
                    ? "border-primary bg-rose-50 shadow-lg shadow-primary/5" 
                    : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white"
                )}
              >
                <div className="relative">
                  <img 
                    src={person.avatar} 
                    alt={person.name}
                    className={cn(
                      "w-20 h-20 rounded-full object-cover border-4 transition-all",
                      isSelected ? "border-primary scale-110 shadow-xl" : "border-white grayscale group-hover:grayscale-0"
                    )}
                  />
                  {isSelected && (
                    <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white border-4 border-rose-50">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className={cn("text-sm font-black mb-0.5", isSelected ? "text-primary" : "text-slate-900")}>
                    {person.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                    {person.relation} • {person.age}y
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Dependent Coverage Active</p>
              <p className="text-[10px] text-slate-500 font-medium">All selected beneficiaries are covered under the current plan.</p>
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-[10px] font-black uppercase tracking-widest"
          >
            <ShieldCheck size={14} />
            Benefit Utilization: 40%
          </motion.div>
        </div>

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-50">
          <button 
            onClick={() => navigate('/checkin/verify')}
            className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            disabled={!selected}
            onClick={handleNext}
            className={cn(
              "flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all shadow-lg",
              selected 
                ? "bg-primary text-white shadow-primary/20 hover:scale-105 active:scale-95" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            )}
          >
            Specify Department
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
