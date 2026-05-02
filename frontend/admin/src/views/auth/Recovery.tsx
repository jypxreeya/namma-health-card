/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Recovery() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-surface">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-12 text-center"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 shadow-sm">
          <ShieldCheck size={32} />
        </div>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mb-3">Recover Access</h2>
            <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">
              Enter your registered administrative email. We'll send a secure one-time link to reset your credentials.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Facility Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="reception@citygeneral.com"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest"
              >
                Send Recovery Link
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight mb-3">Check your inbox</h2>
            <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed">
              A secure link has been sent to your email. It will expire in 15 minutes for your security.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3 text-left">
              <Headphones className="text-blue-600" size={20} />
              <p className="text-[10px] font-bold text-blue-900 uppercase tracking-widest leading-relaxed">
                Didn't get the email? Contact your facility IT administrator.
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-50">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
