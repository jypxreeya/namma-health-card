import { ChevronLeft, ShieldCheck, Mail, LogOut, ChevronRight, Lock, Fingerprint, Smartphone, Globe, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { cn } from '../lib/utils';

export default function Security() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white border-b border-zinc-100 h-16 sticky top-0 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-rose-50 rounded-full text-primary transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Security & Privacy</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center overflow-hidden border border-primary/10">
          <User className="w-5 h-5 text-primary" />
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-zinc-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[220px] relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-7 h-7 fill-current" />
                  </div>
                  <h2 className="font-display font-bold text-3xl text-on-surface tracking-tight">Account is Secure</h2>
               </div>
               <p className="text-zinc-500 font-medium max-w-md text-lg leading-relaxed">Your health records are protected with 256-bit encryption and advanced biometric security measures.</p>
            </div>
            <div className="mt-8 flex gap-3">
              <div className="bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                 Encrypted
              </div>
              <div className="bg-rose-50 text-rose-700 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 border border-rose-100">
                 <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                 2FA Active
              </div>
            </div>
            <ShieldCheck className="absolute -right-16 -bottom-16 w-64 h-64 text-primary/[0.03] rotate-12" />
          </div>

          <div className="bg-primary p-8 rounded-3xl text-white flex flex-col items-center justify-center text-center space-y-6 shadow-xl shadow-rose-100">
             <div className="w-24 h-24 rounded-full border-4 border-white/20 p-1">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuArjpVwKGxVj6m8wLos97-sNNKcBrDAIalkptfPoTEMQqOajSMoFN6XWHKn0T2J8heCOekLEKPNxduqwQE_5YVt4pA1VvSK9vYYde_sCcs7b5ZOfXAyqv1K592X11RcYHFsJPbZ26vFHUL0xa-oq8wypj5zb6iJ1GtzjE_c-qCa9fS3Kkh1iHzeYWNYZpeMpGnm4LAbRTdUlJlFvPx5z0oveIb50tkM7UYBFjOXgxASlG1tDXpUO8Mdm6ziqCpAnuG8fQEjZvbzJtA" className="w-full h-full rounded-full object-cover" alt="user" />
             </div>
             <div>
                <p className="font-display font-extrabold text-xl tracking-tight uppercase">User - Aditi Sharma</p>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Last login: Today, 10:24 AM</p>
             </div>
          </div>
        </div>

        <section className="space-y-4">
           <h3 className="font-display font-bold text-xl px-2">Account Security</h3>
           <div className="bg-white rounded-[32px] overflow-hidden border border-zinc-100 shadow-sm">
              {[
                { icon: Smartphone, label: 'Change Password', desc: 'Updated 3 months ago' },
                { icon: Fingerprint, label: 'Biometric Authentication', desc: 'FaceID or Fingerprint login', toggle: true },
                { icon: Lock, label: 'Two-Factor Authentication', desc: 'Status: Enabled', color: 'text-emerald-600' },
                { icon: Smartphone, label: 'Manage Active Sessions', desc: '2 devices currently signed in' },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between p-6 hover:bg-rose-50 transition-all border-b border-zinc-50 group-last:border-0">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-white transition-colors">
                          <item.icon className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="font-bold text-on-surface tracking-tight leading-none">{item.label}</p>
                          <p className={cn("text-xs font-medium mt-2", item.color || "text-zinc-400")}>{item.desc}</p>
                       </div>
                    </div>
                    {item.toggle ? (
                      <div className="w-12 h-6 bg-primary rounded-full relative p-1 shadow-inner shadow-black/5">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-zinc-200 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </div>
              ))}
           </div>
        </section>

        <section className="pt-8">
           <button 
             onClick={() => navigate('/login')}
             className="w-full bg-error-container/20 text-error font-display font-extrabold text-sm py-6 rounded-3xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-error-container/30 border border-error/10"
           >
             <LogOut className="w-5 h-5" />
             LOGOUT FROM NAMMA HEALTH
           </button>
           <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-8 opacity-50">App Version 2.4.12 • Securely Managed</p>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
