import { Search, ChevronRight, HelpCircle, Phone, Headphones, Plus, ChevronLeft, ArrowRight, MessageSquare, Hospital, CreditCard, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { cn } from '../lib/utils';

export default function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white border-b border-zinc-100 h-16 sticky top-0 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Support Hub</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-50">
           <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjM8gol8z0HIuHkep7ADGf4NjRdwcEjW45oR8HiNjChzGKfuIBjAw2TlZW0yM-rhGvqTpgtq77Ykt9uDTCbzuFaHbJ5M-yHgc2P0fryJvvgbgFDnZ7HIB9Zv_Fhjw4k4GeGD-GYK4cW2JBOusHKVgomq7HiEh8MU_opZFA08ELizXP05SxiDLFhLcwVk0JOgUxakl0_lHvln5w50gURfq_F4sVHUt9nkgf1Jo47wVT-oBv3-gK1hVmRjbkNIxAXldoqb88neW_t4g" alt="profile" />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-8 space-y-12">
        <section className="text-center space-y-4">
          <h2 className="font-display font-extrabold text-4xl text-on-surface tracking-tight leading-tight max-w-lg mx-auto">How can we help you today?</h2>
          <p className="text-zinc-500 font-medium text-lg leading-relaxed max-w-xl mx-auto">Access 24/7 medical support, manage your plan, or find healthcare partners near you.</p>
          <div className="relative max-w-2xl mx-auto pt-6">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none mt-6">
              <Search className="w-6 h-6 text-zinc-300" />
            </div>
            <input 
              className="w-full h-16 pl-16 pr-6 bg-white border-0 border-b-4 border-zinc-100 rounded-t-3xl shadow-sm focus:border-primary focus:ring-0 text-lg transition-all" 
              placeholder="Search for help topics, symptoms..." 
              type="text"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { icon: FileText, title: 'Plan Details', desc: 'View coverage limits and policy renewal.', color: 'rose' },
             { icon: Hospital, title: 'Hospital Network', desc: 'Find cashless hospitals and clinics.', color: 'blue' },
             { icon: CreditCard, title: 'Health Card', desc: 'Download your digital e-card.', color: 'amber' },
           ].map((item, i) => (
             <div key={i} className="bg-white p-8 rounded-[40px] border border-zinc-100 hover:shadow-xl hover:shadow-zinc-100 transition-all cursor-pointer group">
               <div className={cn(
                 "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                 item.color === 'rose' ? "bg-rose-50 text-primary" : item.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
               )}>
                 <item.icon className="w-8 h-8" />
               </div>
               <h3 className="font-display font-bold text-xl mb-2">{item.title}</h3>
               <p className="text-zinc-500 text-sm font-medium mb-6">{item.desc}</p>
               <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all">
                 Explore Now <ArrowRight className="w-4 h-4" />
               </div>
             </div>
           ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-[40px] border border-zinc-100 overflow-hidden shadow-sm">
             <div className="p-8 bg-rose-50 border-b border-zinc-100">
               <h3 className="font-display font-bold text-2xl text-primary flex items-center gap-4 font-extrabold italic">
                 🚨 EMERGENCY SUPPORT
               </h3>
             </div>
             <div className="p-8 space-y-6">
               <div className="flex items-center justify-between p-6 bg-surface rounded-3xl border border-zinc-50">
                 <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Phone className="w-8 h-8" />
                   </div>
                   <div>
                     <p className="font-bold text-lg">Ambulance Service</p>
                     <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">24/7 Priority Response</p>
                   </div>
                 </div>
                 <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold active:scale-95 transition-all text-sm tracking-wide">Call 108</button>
               </div>
                <div className="flex items-center justify-between p-6 bg-surface rounded-3xl border border-zinc-50">
                 <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <Headphones className="w-8 h-8" />
                   </div>
                   <div>
                     <p className="font-bold text-lg">Medical Helpline</p>
                     <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Talk to a nurse now</p>
                   </div>
                 </div>
                 <button className="border-2 border-primary text-primary px-8 py-3 rounded-2xl font-bold hover:bg-rose-50 active:scale-95 transition-all text-sm tracking-wide">Call Info</button>
               </div>
             </div>
           </div>

           <div className="relative rounded-[40px] overflow-hidden min-h-[400px] flex flex-col justify-end p-10 group">
             <div className="absolute inset-0">
               <img 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuACN6lcinhg8ys9EzViJtV21thqlarxCXELx3hBdXyrSwCgC4W4mKN3P5hlQTdfqBFKG2zIJnzHR6hLRxhOvpuPqs87dx0Ogpv4hVATSXQEcF6AXwmCMm6I9RHNvzEsblOyy__mK-V2MerJb8iawGtdt1Mn1DRZQDVkcNIH7_segPnBFjR4GApRy95TN8Wp2-RYryYGpktALtd3Y25yty6F3fcSi-1MfXcYJGJsUd3JwjWK-bKL6m6l3oX4R5RZw5AOrTVM4OD-1ww" 
                 alt="bg" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent"></div>
             </div>
             <div className="relative z-10 space-y-6">
                <h3 className="text-white font-display font-extrabold text-4xl leading-tight">Need direct assistance?</h3>
                <p className="text-white/70 font-medium text-lg max-w-sm">Our medical consultants are available to help you navigate your journey.</p>
                <div className="flex gap-4 pt-4">
                  <button className="bg-primary text-white h-16 px-10 rounded-2xl font-bold flex items-center gap-3 shadow-2xl shadow-rose-950/20 active:scale-95 transition-all">
                    <MessageSquare className="w-6 h-6" />
                    Talk to Us
                  </button>
                  <button onClick={() => navigate('/cp/feedback')} className="bg-white/10 backdrop-blur-xl border border-white/20 text-white h-16 px-6 rounded-2xl font-bold hover:bg-white/20 active:scale-95 transition-all">
                    Submit Feedback
                  </button>
                </div>
             </div>
           </div>
        </section>

        <section className="space-y-8 max-w-4xl mx-auto">
          <h3 className="font-display font-bold text-2xl text-center">Popular FAQs</h3>
          <div className="space-y-4">
            {[
              'How do I claim cashless treatment?',
              'What documents are needed for reimbursement?',
              'Can I add a dependent mid-policy?',
            ].map((q, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-colors">
                <span className="font-bold text-on-surface-variant flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:scale-150 transition-transform"></div>
                   {q}
                </span>
                <ChevronRight className="w-5 h-5 text-zinc-200 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
