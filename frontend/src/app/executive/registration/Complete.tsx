import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Download, 
  Share2, 
  Printer, 
  LayoutDashboard, 
  Info, 
  ArrowRight,
  CreditCard,
  QrCode,
  ShieldAlert,
  Droplets,
  Stethoscope
} from 'lucide-react';
import { motion } from 'motion/react';

export default function RegistrationComplete() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 pb-24">
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Registration Successful
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            The patient record has been created and synced with the central registry.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Card Section */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-display text-sm font-bold text-slate-400 uppercase tracking-widest">
              Digital Health Card
            </h3>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full aspect-[1.586/1] bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl p-10 text-white group">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl text-white tracking-tight uppercase leading-none">NAMMA</h4>
                      <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Health Registry</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <Droplets className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-primary font-bold mb-1.5">Registered Patient</p>
                      <p className="font-display font-bold text-3xl tracking-tight uppercase">Rajesh Kumar Singh</p>
                    </div>
                    <div className="flex gap-12 pt-1">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Registration ID</p>
                        <p className="font-mono text-sm font-bold text-white tracking-widest">NH-8829-1029</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold mb-1">Issue Date</p>
                        <p className="font-bold text-sm tracking-tight">OCT 2023</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-2xl shadow-xl">
                    <QrCode className="w-16 h-16 text-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100 flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display font-bold text-emerald-900 text-lg mb-1 uppercase tracking-tight">Identity Activated</p>
              <p className="text-emerald-700/70 leading-relaxed font-bold text-sm uppercase tracking-widest">
                The digital card is ready for use. The patient can present this QR code at any Namma Health network partner.
              </p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="lg:col-span-5 space-y-5">
          <div className="mb-2">
            <h3 className="font-display text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
              Available Actions
            </h3>
          </div>
          
          <button className="flex items-center justify-between w-full h-20 px-8 bg-primary text-white rounded-3xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 group">
            <div className="flex items-center gap-5">
              <Download className="w-6 h-6" />
              <span className="font-display font-bold text-xl uppercase tracking-tight">Download ID Card</span>
            </div>
            <span className="text-white/40 text-xs font-bold tracking-widest">PDF</span>
          </button>
          
          <button className="flex items-center justify-between w-full h-20 px-8 bg-white border border-slate-100 text-slate-700 rounded-3xl hover:bg-slate-50 transition-all group shadow-sm">
            <div className="flex items-center gap-5">
              <Share2 className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="font-display font-bold text-xl uppercase tracking-tight">Share with Patient</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </button>

          <button className="flex items-center justify-between w-full h-20 px-8 bg-white border border-slate-100 text-slate-700 rounded-3xl hover:bg-slate-50 transition-all group shadow-sm">
            <div className="flex items-center gap-5">
              <Printer className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="font-display font-bold text-xl uppercase tracking-tight">Print Physical Copy</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-primary transition-all" />
          </button>

          <div className="py-4"></div>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full h-20 bg-slate-900 text-white rounded-3xl font-display font-bold text-xl uppercase flex items-center justify-center gap-4 hover:bg-black transition-all shadow-xl"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span>Go to Dashboard</span>
          </button>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mt-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Health Alerts</h4>
              <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-rose-100">Critical</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100 group transition-colors">
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 uppercase tracking-widest text-xs leading-loose">Penicillin Allergy Detected</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 group transition-colors">
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 uppercase tracking-widest text-xs leading-loose">Blood Group O Negative</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
