import { Bell, Download, Hospital, Calendar, Headphones, Plus, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BottomNav } from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white sticky top-0 z-50 border-b border-zinc-100 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-PxBQhVmxkekps_KpYdwG3tMNlW5g1e1KWNWLNZYXT5psAIPpTt_mJLhjWl25IIlVSMNRTXNWpdfXj-DT4c3Awyv2-JK4UH6YHdO7XTclEkMOXrbSvE-rV1HB6aj2FX1-alO3kQVI6a6jNGhPgd5BexqHRsv-3qprRQELImckC94fPvzmNF37gW0NeYlC--5Qqqq9qUL6XKr_7QCY7L9g47n4Mym5ezCP9aN4O1JIcbtA_Ql8c_X8id6xU_Da-UUlWgNtc37_En0" alt="profile" />
          </div>
          <span className="text-lg font-extrabold text-zinc-900 font-display">Customer Portal</span>
        </div>
        <button onClick={() => navigate('/cp/notifications')} className="relative p-2 text-zinc-500 hover:bg-zinc-50 rounded-full">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {/* Renewal Alert */}
        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-2xl flex items-center gap-3 border border-error/10">
          <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
             <ShieldCheck className="w-5 h-5 text-error" />
          </div>
          <span className="text-xs font-bold leading-tight">Renew in 15 days to keep your Platinum benefits active.</span>
        </div>

        {/* Membership Summary Card */}
        <div 
          onClick={() => navigate('/cp/card-detail')}
          className="bg-primary-container text-white p-6 rounded-[32px] shadow-xl shadow-rose-100 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Membership Card</p>
                <h2 className="font-display font-bold text-3xl mt-1 tracking-tight">Active</h2>
              </div>
              <div className="bg-white p-2 rounded-xl">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4VInkb_uhzuQqExJ3ATt3xtc6jZtv4sytWK8axQSq2uB-qKF9MxX1IinQYBG_UXPszkGJGia0LhnvfqXJT7BLioYzPIpDpqu2mUTnz8cTgsozlrx0Lwxbd8YGH4Xy-C6PIMokLsKPS3iSvxd3ioMlxW8EVBJL5kGPq1aJ6Drn5cHMKTQfZXlREMF-JluijHYfiYeNH_0vNBJoXfynn0EtCIC5Scvv0KCRfFG_uuX9U52PLYrkEqi8r-GbLNnKZNjUHP8hUbSgRds" className="w-12 h-12" alt="qr" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-white/70 text-[10px] font-bold uppercase">Membership ID</p>
                <p className="font-display font-bold text-xl tracking-widest mt-0.5">NH 772 910 442</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/70 text-[10px] font-bold uppercase">Valid Until</p>
                  <p className="font-bold text-lg mt-0.5">24 Oct 2024</p>
                </div>
                <span className="font-display font-extrabold italic text-white/30 text-2xl tracking-tighter">NAMMA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="grid grid-cols-4 gap-2">
          {[
            { icon: Download, label: 'Download Card', path: '/card-detail' },
            { icon: Hospital, label: 'Find Hospital', path: '/support' },
            { icon: Calendar, label: 'Book Service', path: '/support' },
            { icon: Headphones, label: 'Support', path: '/support' },
          ].map((action, i) => (
            <div 
              key={i} 
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-all"
            >
              <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-center leading-tight px-1">{action.label}</span>
            </div>
          ))}
        </section>

        {/* Family Overview */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-xl">Family Overview</h3>
            <button 
              onClick={() => navigate('/cp/family')}
              className="text-primary font-bold text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>
          <div 
            className="flex gap-6 overflow-x-auto no-scrollbar py-2 cursor-pointer"
            onClick={() => navigate('/cp/family')}
          >
            {[
              { label: 'Wife', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3o4xgnsqqG4HH9OSLDkX37cYWrHuQZjOnT65ylQjPLQDYKy6nxm2RE1CEwwv2PSEiXMY_zoxOXuXuzNDsITnD6Buhsl--TX5heEcxunV3HjP2Qh-B-bMxG364eIdKO7JiE-hL5nig7w3p3jtbvSxHyrqlbTOuSSQUBuU9l3wnYNIULDAJgHtkWQkMMKFJg4ajRCyNBZ1bfDwkokAtz2mHZtNcUaOBF4l15OhL3esWy2YAEUEEb7CwuQfVepWBci44g-cTvrjYZHo' },
              { label: 'Son', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmNkedamxrQu0AYBmtGYzsUiKYx7Tix7sC-ZV45OK--aGfahaRP7qVFw-C_xsggYXyFH2-4CLdk1SiG1fGLySSasp1exESVt5SzaoQSsCEGsyZqY1tmAhuuqrbnrI8fsMxBYRUcCOzo5bbl4VtVnb5_6bbzSKl1DfmHc8VcdvK07EUROsRiHJKT1XCzq9kzezBWAZ0lkMouoJBfZaIpri5lJFaCKd5TEkWO-I823y8bEKZ1SIqozey3nPgpgtMhSbTcv9eYglztpI' },
              { label: 'Mother', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUmKTqaJaFg32Pl1z9PR4D5L6_xEC6kh2cLluGWuu37Aj0TBxyHBvFWQiuGOmKbv0WYiqVNAvO8AZbBBygJqp679_Vrji75S3r5je28FdkEZZntb-NDPGCKZdGImS141cJbtaA7Yg-wHCI2wrcXnADFnIKLNB6_c2iDq7gr9_CpGX0iuQ9OLsHG3tklYYmEXu3yOlp6kyaaIu3yAexSXFL2iqWtnp0qTIF2wkSCnqlKlMX8fZoEZHMhbUDzbiOqha8x_frhSMpEJQ' },
            ].map((m, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={cn("w-16 h-16 rounded-full p-1 border-2", i === 0 ? "border-primary" : "border-transparent bg-surface-container")}>
                  <img src={m.img} className="w-full h-full rounded-full object-cover" alt={m.label} />
                </div>
                <span className="text-xs font-bold">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Plan Details */}
        <section className="space-y-4">
          <h3 className="font-display font-bold text-xl">Plan Details</h3>
          <div className="bg-white border border-outline-variant/30 rounded-[32px] p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-display font-bold text-lg text-primary tracking-tight">Platinum Health Plus</h4>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-0.5">Premium Family Coverage</p>
              </div>
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-sm">Pro</span>
            </div>
            <ul className="space-y-4">
              {[
                'Unlimited Free OPD Consultations',
                'Flat 50% Off Lab Tests',
                'Complimentary Dental Checkup',
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-on-surface">{text}</span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-8 py-4 rounded-2xl border-2 border-primary text-primary font-display font-bold text-sm active:bg-primary/5 transition-all">
              View All Benefits
            </button>
          </div>
        </section>

        {/* Recent Services */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-xl">Recent Services</h3>
            <button onClick={() => navigate('/cp/history')} className="text-primary font-bold text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { hospital: 'Apollo Hospital', test: 'General Checkup', date: '12 Oct 2023', color: 'rose' },
              { hospital: 'Max Lab', test: 'Blood Test', date: '08 Oct 2023', color: 'blue' },
              { hospital: 'Narayana Health', test: 'Flu Shot', date: '30 Sep 2023', color: 'rose' },
            ].map((s, i) => (
              <div 
                key={i} 
                className="bg-white flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 active:border-primary/20 transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", s.color === 'rose' ? "bg-rose-50 text-primary" : "bg-blue-50 text-tertiary")}>
                  <Hospital className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-display font-bold text-on-surface truncate tracking-tight">{s.hospital} - {s.test}</h5>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{s.date}</p>
                    <span className="text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Completed</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300" />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNav />
      {/* FAB */}
      <button className="fixed bottom-24 right-6 w-16 h-16 bg-primary text-white rounded-2xl shadow-2xl shadow-rose-200 flex items-center justify-center transition-transform active:scale-95 z-40">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
