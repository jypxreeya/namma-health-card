/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Verification' },
  { id: 2, label: 'Beneficiary' },
  { id: 3, label: 'Department' },
  { id: 4, label: 'Complete' },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center w-full mb-12">
      <div className="flex items-center w-full max-w-2xl px-4">
        {steps.map((step, idx) => (
          <div key={step.id} className={cn("flex items-center", idx !== steps.length - 1 ? "flex-1" : "")}>
            <div className="relative flex flex-col items-center">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all border-2",
                  currentStep === step.id 
                    ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/20" 
                    : currentStep > step.id 
                    ? "bg-emerald-500 border-emerald-500 text-white" 
                    : "bg-white border-slate-200 text-slate-400"
                )}
              >
                {currentStep > step.id ? <Check size={18} /> : step.id}
              </div>
              <span 
                className={cn(
                  "absolute top-12 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.15em]",
                  currentStep === step.id ? "text-primary" : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
            
            {idx !== steps.length - 1 && (
              <div 
                className={cn(
                  "h-0.5 flex-1 mx-2 transition-all duration-500",
                  currentStep > step.id ? "bg-emerald-500" : "bg-slate-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
