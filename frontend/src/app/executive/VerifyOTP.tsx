import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ArrowRight, ShieldAlert, Lock, Timer, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['4', '8', '', '', '', '']);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <header className="h-20 flex items-center px-6 md:px-10 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/reset-password')}
              className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all active:scale-[0.95] text-slate-400 hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-display font-bold text-2xl text-slate-800 tracking-tight">Namma Health</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-slate-400 px-5 py-2 bg-slate-50 rounded-full border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Identity Verification</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 pb-20">
        <div className="w-full max-w-lg">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 md:p-16 text-center shadow-xl shadow-slate-200/50"
          >
            <div className="flex flex-col items-center mb-10">
              <div className="w-20 h-20 bg-slate-50 text-primary flex items-center justify-center rounded-3xl mb-8 shadow-sm border border-slate-100">
                <Lock className="w-10 h-10" />
              </div>
              <h1 className="font-display text-3xl font-bold text-slate-800 mb-3 ml-2 tracking-tight">Verification</h1>
              <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto leading-relaxed">
                Enter the 6-digit code sent to <span className="text-slate-800 font-bold">+91 9XXXXX1234</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-10">
              <div className="flex justify-between gap-2.5 md:gap-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    placeholder="•"
                    className="w-12 h-16 md:w-16 md:h-20 text-center text-3xl font-display font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary focus:bg-white transition-all outline-none placeholder:text-slate-200 text-slate-800"
                  />
                ))}
              </div>

              <div className="space-y-6">
                <button 
                  type="submit"
                  className="w-full h-16 bg-primary hover:bg-primary-dark text-white rounded-2xl font-display font-bold text-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                >
                  Verify Code
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="space-y-6 pt-4">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Didn't receive code?</p>
                  <div className="flex items-center justify-center gap-3 text-slate-800">
                    <Timer className="w-5 h-5 text-primary" />
                    <span className="font-display font-bold text-2xl tracking-widest">00:30</span>
                  </div>
                  <button 
                    disabled 
                    type="button"
                    className="text-slate-300 font-bold text-[10px] uppercase tracking-widest cursor-not-allowed hover:text-primary transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          <div className="mt-16 grid grid-cols-3 gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {[
              { icon: Lock, label: "Encrypted" },
              { icon: ShieldCheck, label: "Compliant" },
              { icon: BadgeCheck, label: "Verified" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <item.icon className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-10 text-center border-t border-slate-100 bg-white">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Namma Health Platforms • Professional Registry
        </p>
        <div className="mt-4 flex justify-center gap-8 text-[9px] font-bold uppercase tracking-widest text-slate-300">
          <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#help" className="hover:text-primary transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
}
