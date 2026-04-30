import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Send, BadgeHelp, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 pb-20">
      <main className="w-full max-w-lg">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white shadow-xl rounded-3xl mb-8 border border-slate-100"
          >
            <ShieldCheck className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-3xl font-bold text-slate-800 mb-3 tracking-tight"
          >
            Forgot Password?
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg font-medium"
          >
            Enter your details to receive a recovery code.
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100"
        >
          <form onSubmit={handleSendOTP} className="space-y-8">
            <div className="grid gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1" htmlFor="identifier">
                Staff ID or Registered Mobile
              </label>
              <div className="relative">
                <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  id="identifier"
                  required
                  className="block w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-primary focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-300"
                  placeholder="EX-00000 or 9876543210"
                  type="text"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full h-14 flex items-center justify-center bg-primary text-white font-display font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-[0.98] transition-all gap-3 group"
            >
              Send Recovery Code
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-50 pt-8">
            <Link to="/login" className="group inline-flex items-center justify-center text-slate-400 font-bold text-sm hover:text-primary transition-all gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full border border-slate-100 shadow-sm">
            <BadgeHelp className="text-primary w-4 h-4 mr-3" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Need assistance? <span className="text-slate-800">Contact Support</span></span>
          </div>
        </div>
      </main>
    </div>
  );
}
