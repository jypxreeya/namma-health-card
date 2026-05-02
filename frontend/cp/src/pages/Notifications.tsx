import { ChevronLeft, Settings, CheckCircle2, Bell, Smartphone, CreditCard, Tag, Hospital, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle2,
      title: 'Registration Successful',
      desc: 'Welcome to Namma Health! Your registration is successful.',
      time: '2 hours ago',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      id: 2,
      type: 'urgent',
      icon: AlertTriangle,
      title: 'Membership Expiring Soon!',
      desc: 'Renew within 5 days to avoid service interruption.',
      time: 'URGENT',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      action: 'Renew Now'
    },
    {
       id: 3,
       type: 'info',
       icon: CreditCard,
       title: 'Digital Health Card Issued',
       desc: 'View your new card in the dashboard.',
       time: '4 hours ago',
       color: 'text-primary',
       bg: 'bg-rose-50'
    },
    {
       id: 4,
       type: 'offer',
       icon: Tag,
       title: 'Health Checkup Offer',
       desc: 'Flat 20% Off on Full Body Checkups at Max Labs.',
       time: 'Yesterday',
       color: 'text-rose-700',
       bg: 'bg-rose-100/50',
       badge: 'NAMMA20'
    }
  ];

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white sticky top-0 z-50 border-b border-zinc-100 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Notifications</h1>
        </div>
        <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-full">
           <Settings className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Alerts', 'Offers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-sm",
                activeTab === tab ? "bg-primary text-white" : "bg-white text-zinc-400 border border-zinc-100"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div key={n.id} className={cn(
              "bg-white p-5 rounded-[28px] border border-zinc-100 flex gap-5 items-start hover:shadow-lg transition-all cursor-pointer",
              n.type === 'urgent' && "border-l-4 border-l-amber-500"
            )}>
              <div className={cn("w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center", n.bg)}>
                <n.icon className={cn("w-7 h-7", n.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-display font-bold text-on-surface tracking-tight leading-none">{n.title}</h3>
                  <span className={cn("text-[8px] font-extrabold uppercase tracking-widest px-2 py-1 rounded bg-zinc-50 text-zinc-400", n.type === 'urgent' && "bg-amber-100 text-amber-700")}>{n.time}</span>
                </div>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed mt-2">{n.desc}</p>
                {n.action && (
                  <button className="mt-4 text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 hover:underline">
                    {n.action}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {n.badge && (
                  <div className="mt-4">
                    <span className="bg-white border-2 border-primary/20 text-primary px-4 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-widest ">{n.badge}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="py-12 flex flex-col items-center text-center opacity-40">
           <div className="w-32 h-32 mb-6 grayscale mix-blend-multiply">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKIxp-kJSC0lcccs8AxR405zYC1rZ-lYAplKBL7f3yZ9WAu9Bu7lL8BpPVGpm6mREbNVY4wnBPlUKuaxsH1Q8hCWfHP920NaSzs55B80laJIw0prGV-LbXexZah0BgIXabocKLowHQXafnpw6N1lDLMD11trEe7r5AOj_-D3s1_2DiK5gO7XTDaFB7e2GsxEHbtywYt6_8Jx0cgxmGFL7FIr-TqLI3S3NgA3X8L-65vdggToHlmQyABJmcoyFEcZVMvpKzwNIu1k8" 
                alt="empty" 
                className="w-full h-full object-contain"
              />
           </div>
           <p className="text-zinc-500 font-extrabold text-[10px] uppercase tracking-[0.3em]">You're all caught up!</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
