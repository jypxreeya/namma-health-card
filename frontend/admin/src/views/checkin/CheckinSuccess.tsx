/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Printer, Phone, Download, QrCode, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function CheckinSuccess() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 border-4 border-emerald-50"
      >
        <CheckCircle2 size={42} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight mb-2">Check-in Confirmed</h2>
        <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
          The digital token has been successfully issued for <span className="font-bold text-slate-900">Arjun Mehta</span>.
        </p>
      </motion.div>

      {/* Digital Token Card */}
      <motion.div 
        initial={{ opacity: 0, rotate: -2 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 relative mb-12 token-cut"
      >
        <div className="bg-primary p-6 text-white text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Queue Token</p>
          <p className="text-5xl font-display font-black mb-2">A-024</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black tracking-widest uppercase">
            <QrCode size={12} />
            Verified Member
          </div>
        </div>

        <div className="p-8 space-y-6 bg-white">
          <div className="flex justify-between items-center pb-6 border-b border-slate-50">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Department</p>
              <p className="text-sm font-bold text-slate-900">General Medicine</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Wait Time</p>
              <p className="text-sm font-bold text-primary">~12 Minutes</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
              <p className="text-xs font-bold text-slate-600">Oct 24 • 10:45 AM</p>
            </div>
            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-100">
               <QrCode size={40} className="text-slate-900" />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 flex justify-center gap-4 border-t border-slate-100">
          <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
            <Share2 size={14} /> Share Link
          </button>
          <div className="w-px h-3 bg-slate-200 self-center" />
          <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
            <Download size={14} /> Save Proof
          </button>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all outline-none">
          <Printer size={20} />
          Print Token
        </button>
        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all outline-none">
          <Phone size={20} />
          Send to WhatsApp
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none"
        >
          Return to Dashboard
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
