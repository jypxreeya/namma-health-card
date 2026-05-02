/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, MapPin, Phone, User, Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../../components/ui/Stepper';

export default function Verification() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/checkin/beneficiary');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Stepper currentStep={1} />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
      >
        <header className="mb-10 text-center">
          <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mb-2">Member Verification</h2>
          <p className="text-sm text-slate-500 font-medium">Search for the primary card holder to begin the clinical check-in process.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Search Identifier</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="ID, Phone or Aadhaar..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none text-sm font-bold transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <Fingerprint size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-900">Biometric Scan Ready</p>
                <p className="text-[10px] text-blue-700/60 font-medium">Hardware connected via USB-C</p>
              </div>
              <button className="ml-auto text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Launch</button>
            </div>
          </section>

          <section className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group transition-colors hover:bg-slate-100/50">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <User size={32} />
            </div>
            <p className="text-xs font-bold text-slate-400 mb-1">No Active Selection</p>
            <p className="text-[10px] text-slate-400 font-medium px-8 leading-relaxed">
              Enter valid identifiers or scan the card to pull member details for verification.
            </p>
          </section>
        </div>

        {/* Mock Result Preview */}
        <div className="mt-10 p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&h=64&auto=format&fit=crop" 
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">Arjun Mehta <span className="ml-2 font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-emerald-100 text-emerald-600">Verified</span></p>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                  <Phone size={12} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                  <MapPin size={12} />
                  <span>Indiranagar, BLR</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Start Check-in
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 pt-8 border-t border-slate-50 opacity-40">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">UIDAI Sec Link</span>
          </div>
          <div className="w-px h-3 bg-slate-200" />
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">SSL 256 Encr.</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
