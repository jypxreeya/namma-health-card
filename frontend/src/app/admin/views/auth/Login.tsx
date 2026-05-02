/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Verified } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-surface">
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1100px] bg-white rounded-2xl shadow-xl border border-outline-variant overflow-hidden flex flex-col md:flex-row min-h-[640px]"
      >
        {/* Left Section */}
        <section className="hidden md:flex flex-1 bg-slate-50 p-12 flex-col justify-between relative overflow-hidden">
          <div className="z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <ShieldCheck size={28} />
              </div>
              <span className="text-2xl font-display font-black text-primary tracking-tighter">Hospital</span>
            </div>
            
            <div className="max-w-md">
              <h1 className="text-3xl font-display font-bold text-slate-900 leading-tight mb-4">
                Empowering Healthcare Administration.
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed">
                Securely manage patient records, billing, and clinical queues for City General Hospital with our streamlined digital ecosystem.
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center py-12 z-10">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop" 
              alt="Medical Tech" 
              className="w-full max-w-[400px] opacity-80 mix-blend-multiply"
            />
          </div>

          <footer className="z-10">
            <p className="text-[11px] text-slate-400 font-medium">© 2024 Namma Health Systems. All rights reserved.</p>
          </footer>

          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </section>

        {/* Right Section */}
        <section className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-16">
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Admin Portal Login</h2>
              <p className="text-sm text-slate-500 font-medium">Enter your credentials to access the facility dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    id="email"
                    required
                    placeholder="reception@citygeneral.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-primary focus:bg-white transition-all outline-none rounded-t-lg text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <Link to="/admin/recovery" className="text-xs font-bold text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-primary focus:bg-white transition-all outline-none rounded-t-lg text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-4 h-4 rounded border-slate-200 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <label htmlFor="remember" className="text-sm text-slate-500 font-medium select-none cursor-pointer">
                  Remember this device for 30 days
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-variant transition-all shadow-lg active:scale-95"
              >
                Sign In
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Need technical support?
                <Link to="#" className="text-primary font-bold ml-1 hover:underline">
                  Contact IT Helpdesk
                </Link>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-1.5 grayscale">
                <Verified size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 grayscale">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">256-Bit AES</span>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
