import { ChevronLeft, MoreVertical, ShieldCheck, Verified, Download, Share2, Wallet, Printer, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { cn } from '../lib/utils';

export default function HealthCardDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-zinc-100 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-rose-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Digital Health Card</h1>
        </div>
        <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      <main className="pt-20 px-4 max-w-lg mx-auto space-y-8">
        <section>
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-[32px] p-6 text-white shadow-[0_20px_40px_rgba(184,0,73,0.15)] relative overflow-hidden aspect-[1.58/1]">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-lg"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Namma Health</p>
                  <h2 className="font-display font-extrabold text-2xl tracking-tight uppercase">Aditi Sharma</h2>
                </div>
                <ShieldCheck className="w-10 h-10 text-white fill-current opacity-90" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-[8px] font-extrabold uppercase tracking-widest mb-1">Membership ID</p>
                  <p className="font-display font-bold text-lg tracking-wider">NH-9920-3341</p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-[8px] font-extrabold uppercase tracking-widest mb-1">Valid Thru</p>
                  <p className="font-display font-bold text-lg">12 / 2028</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-zinc-100 border border-zinc-50 mb-4 inline-block">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD4yG-PbSIlSCqSRY0hHT_58gC4VgT4tzXLBQY9s1namvko4GyiWws-Wf693xt6EW_u948h2pBxK1kQAPX0undI8jsJcTqjhksGhvOj7L-Fid-wPqQke6Hh_13jb_EAfjMx7qkjVeIeJUS7kfV3IKGqXZe2O72HBte5QnXOKerZqBahT95e5V53hwcOIp6zF1o5dUSzpVtOdCEx8Yf-wqPCZbSn1QXx3QTMBtcYH6jZwcyG1Wz6GwQtE3lBkXFtN_Ope6ka442jRM" 
              className="w-40 h-40 grayscale contrast-125" 
              alt="qr" 
            />
          </div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center px-8 leading-relaxed">
            Scan at hospitals or clinics for digital verification
          </p>
        </section>

        <section>
          <div className="bg-white rounded-2xl p-4 border border-zinc-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Verified className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-on-surface">Active Status</h3>
                <p className="text-xs font-medium text-zinc-500">Expires: Dec 31, 2028</p>
              </div>
            </div>
            <div className="bg-emerald-100 px-4 py-1.5 rounded-full">
              <span className="text-emerald-700 text-[10px] font-extrabold tracking-widest uppercase">Live</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          {[
            { icon: Download, label: 'Download PDF', color: 'text-primary' },
            { icon: Share2, label: 'Share Card', color: 'text-primary' },
            { icon: Wallet, label: 'Apple Wallet', bg: 'bg-black text-white' },
            { icon: Printer, label: 'Print Card', color: 'text-primary' },
          ].map((action, i) => (
            <button 
              key={i}
              className={action.bg ? 
                `flex flex-col items-center justify-center gap-2 p-5 rounded-3xl active:scale-95 transition-all ${action.bg}` :
                `bg-white border border-zinc-100 flex flex-col items-center justify-center gap-2 p-5 rounded-3xl active:scale-95 transition-all`
              }
            >
              <action.icon className={cn("w-6 h-6", action.color)} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest leading-none">{action.label}</span>
            </button>
          ))}
        </section>

        <section className="pb-10">
          <h3 className="font-display font-bold text-xl mb-4 px-1">Linked Family Members</h3>
          <div className="space-y-3">
            {[
              { name: 'Priya Sharma', relation: 'Spouse', id: 'NH-9920-3342', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOp7fs-3clgyqlmZh8-ff-hkEPVdvGMqjj6Niir6Culg64srev_gw6YeyBikkJy-Fz2r-0WDCMyre1duWETl-h5LAAFRYqdYgh6j9gDtYFX4xx7il-TGzgMmeqP0-1iQ2GM7zNylZJDG6aEEfyiszJPwJzkEjvxkCUfKK0wLQSub8gdW3vUMJWTR04mAWz7VYPkjKc87FS5c9eKYGN3VrU1pQBOeajlgUNa-o_BYkljWRE4fd3pqGMM43ROfhSVDKGCKO2Q1LeVsg' },
              { name: 'Arjun Sharma', relation: 'Son', id: 'NH-9920-3343', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBovU1gQsoHCo1rCHDG9e5dB6u3PvMA5fBQLwmuvZWcDoA8_-cYI_DXwOCZojA_OimEGG48DhDLYOM5dBjsSSZT2g27mGVjuBHQ1UzZnPYsqiKU8ZzDmM6mnxw0y9MIQI3B2LWkxX24crDLk49Wy5Yhu1O6MjW0B4eqlG8An4Pjecd-qLizUdaJBeS9B89Z-Xs8QaQXkA0v0-n-JhCEuSTc7gMkbwfie23llQMIfUt4nda6KpaBP-pfz53b-AbhOyFXejGeLKcUSfg' },
            ].map((m, i) => (
              <div 
                key={i}
                className="bg-surface-container-low rounded-3xl p-4 flex items-center justify-between active:bg-zinc-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                    <img src={m.img} className="w-full h-full object-cover" alt={m.name} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface leading-tight">{m.name}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{m.relation} • {m.id}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-300" />
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
