import { Search, ChevronLeft, Calendar, Clock, Gift, FileText, CheckCircle2, Hospital } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { BottomNav } from '../components/Navigation';

export default function ServiceHistory() {
  const navigate = useNavigate();

  const services = [
    {
      hospital: 'Apollo Hospital',
      type: 'General Consultation',
      date: 'Oct 24, 2023',
      time: '10:30 AM',
      status: 'Completed',
      offer: '20% Discount applied via Namma Prime',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOGEUPjav0T_oqgAvh14_cF6uvUakmRIEGZGaTWoL5Tcu2gX9bNyzUx3TtsIBKnlMHAGde9Z0Q0OH7NaJWqwKphsKP1YdUAOidlbJ-wjxBwSybt_O0-cEIJfTXlnqSZK7qr4cURvHBBNp3azaHhk9bYVFO5wK1WwSXHtcjmJQiqx-M1nxTUGx9_gNCvNBoDvz9R2C9wH1-1Lo9ABkmefYMWD0Q8_KPQYLtDi3drbK_JEwbYi5YsdPoMzlc0OaJqRf8MSsJEp4C9Wo'
    },
    {
      hospital: 'Max Lab',
      type: 'Complete Blood Profile',
      date: 'Oct 18, 2023',
      status: 'Completed',
      report: 'Report Available',
      offer: 'Free home sample collection included',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOiU5uxlYlR0eIvjnKq_nT9CUB_LEFfFfk9T_PUEkfeFEC7LI9t7Ll8g7pq8e5cfSwHGYMsalFGr8MvCYqCBu5ApqcIC2X8_rGBmHLZjZMgliq2OvVjvjpZHntuDaFlZk_6t1Hd07EIDQtVmhiQz6yUr3Dy4Oe_1C6FNHgcDkrCdNh5yInhba6yqgKgoHphaUTpvJr5j7CQLGIp2pF98rQel1YYhR6BKAa3DXJIJsIkWZGm_BVx6yCWEgRwshrUD82Dm6XNPQmzVE'
    },
  ];

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white sticky top-0 z-50 border-b border-zinc-100 flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Service History</h1>
        </div>
        <div className="text-primary font-extrabold text-xl font-display">NH</div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <section>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-300" />
            </div>
            <input 
              className="w-full h-14 pl-12 pr-4 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-2xl font-medium transition-all" 
              placeholder="Search by hospital or service" 
              type="text"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {['All', 'Consultations', 'Lab Tests', 'Pharmacy'].map((cat, i) => (
              <button 
                key={i}
                className={cn(
                  "px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap shadow-sm transition-all",
                  i === 0 ? "bg-primary text-white" : "bg-white text-zinc-500 border border-zinc-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-[24px] border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed overflow-hidden ring-1 ring-zinc-50">
                    <img src={s.img} className="w-full h-full object-cover" alt={s.hospital} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-on-surface tracking-tight">{s.hospital}</h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{s.type}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase border border-emerald-100 italic tracking-wider">Completed</span>
              </div>

              <div className="flex items-center gap-6 py-4 border-t border-zinc-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-bold text-zinc-500">{s.date}</span>
                </div>
                {s.time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-300" />
                    <span className="text-xs font-bold text-zinc-500">{s.time}</span>
                  </div>
                )}
                {s.report && (
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary">{s.report}</span>
                  </div>
                )}
              </div>

              <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3">
                <Gift className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-on-surface-variant">{s.offer}</span>
              </div>
            </div>
          ))}

          <div className="py-8 flex items-center justify-center gap-4">
            <div className="h-[1px] flex-grow bg-zinc-100"></div>
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-[0.2em]">September 2023</span>
            <div className="h-[1px] flex-grow bg-zinc-100"></div>
          </div>

          <div className="bg-white p-4 rounded-[24px] border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] opacity-60">
             <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-on-surface tracking-tight">Cloudnine Clinic</h3>
                    <p className="text-xs font-bold text-zinc-400">Pediatric Follow-up</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-zinc-50 text-zinc-500 text-[10px] font-extrabold uppercase">Completed</span>
              </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
