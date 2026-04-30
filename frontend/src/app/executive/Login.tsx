import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Smartphone, Eye, EyeOff, BadgeCheck, Zap, User, Lock, HeartPulse, BadgeHelp, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden min-h-[700px] shadow-2xl border border-slate-100">
        {/* Visual Section */}
        <div className="relative hidden lg:flex flex-col justify-between p-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
              alt="Healthcare professionals"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <h1 className="text-white font-display text-2xl font-bold tracking-tight uppercase">NAMMA HEALTH</h1>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-white font-display text-5xl font-bold mb-6 leading-tight tracking-tight">
                Empowering <br />
                <span className="text-rose-100">Care in the Field</span>.
              </h2>
            </motion.div>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 text-xl mb-10 leading-relaxed font-medium max-w-sm"
            >
              Register patients and manage healthcare benefits across the community with our secure field operations hub.
            </motion.p>
            
            <div className="flex gap-4">
              {[
                { icon: Globe, label: "Community Driven" },
                { icon: BadgeCheck, label: "HIPAA Compliant" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex-1"
                >
                  <item.icon className="text-white w-5 h-5 mb-2" />
                  <p className="text-white font-bold text-xs uppercase tracking-widest">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            System is operational
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-white">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="text-primary font-display font-bold text-2xl tracking-tighter uppercase">NAMMA</span>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-3xl font-bold text-slate-800 mb-2 tracking-tight">Sign In</h2>
            <p className="text-slate-400 text-lg font-medium">Welcome back, Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid gap-2 text-left">
              <label 
                className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1" 
                htmlFor="staff-id"
              >
                Staff Identification
              </label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  id="staff-id"
                  required
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary focus:bg-white transition-all outline-none text-slate-700 font-medium placeholder:text-slate-300"
                  placeholder="Enter your Staff ID"
                  type="text"
                />
              </div>
            </div>

            <div className="grid gap-2 text-left">
              <div className="flex justify-between items-center mb-1">
                <label 
                  className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1" 
                  htmlFor="password"
                >
                  Secret Key
                </label>
                <Link to="/reset-password" onClick={(e) => { e.preventDefault(); navigate('/reset-password'); }} className="text-xs font-bold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  id="password"
                  required
                  className="w-full h-14 pl-14 pr-14 bg-slate-50 border border-slate-100 rounded-2xl focus:border-primary focus:bg-white transition-all outline-none text-slate-700 font-medium placeholder:text-slate-300"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-5 h-5 rounded-lg border-slate-200 text-primary focus:ring-primary cursor-pointer"
              />
              <label className="text-sm text-slate-500 font-medium cursor-pointer" htmlFor="remember">
                Keep me logged in
              </label>
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-primary text-white font-display font-bold text-lg rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              Access Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <footer className="mt-12 flex flex-col items-center gap-6 border-t border-slate-50 pt-10">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <BadgeHelp className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Support: <span className="text-slate-700">1800-NAMMA-CARE</span>
              </p>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              <a className="hover:text-primary transition-colors" href="/privacy">Privacy</a>
              <a className="hover:text-primary transition-colors" href="/terms">Terms</a>
              <a className="hover:text-primary transition-colors" href="/legal">Legal</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
