import { ChevronLeft, MessageSquare, Shield, HelpCircle, Phone, Mail, Map, Star, UploadCloud, Send, ShieldCheck, Check, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';

export default function Feedback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-zinc-100 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-rose-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Feedback & Complaints</h1>
        </div>
        <HelpCircle className="w-6 h-6 text-zinc-200" />
      </header>

      <main className="pt-20 px-4 max-w-4xl mx-auto space-y-12">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
           <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary">We are here to help</span>
              <h2 className="font-display font-extrabold text-4xl tracking-tight leading-tight">Submit Feedback or Complaint</h2>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                Your voice helps us improve. Whether you have a suggestion, a compliment, or a concern about our services, we are committed to listening and responding within 24 hours.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-primary">
                       <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-900 leading-none">Priority Support</p>
                      <p className="text-[10px] font-medium text-zinc-400 mt-1">24/7 Monitoring</p>
                    </div>
                 </div>
                  <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                       <Shield className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-900 leading-none">Confidential</p>
                      <p className="text-[10px] font-medium text-zinc-400 mt-1">End-to-end Encrypted</p>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[300px] rounded-[40px] overflow-hidden shadow-2xl shadow-rose-100">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgPqG6CrVGIaGEEd8mI9U94HOzc3IHvvYjySBPpLxs_MdgGHgymU5pAZPxeGaJXEX1k1Y-R4kk7lMaxaFAA_ld-t0OhnrIawFpxDKzs7z6aXKB3SIC6LtL97rPFLWsKI0_2BKKBq_qk0VOz1Topef4t1q65tgw6vyeJJDpxNpwa9fETVwnCHOEFXnp0urpCTyToU7HS-Ytz51ZgAG0T5Fu2diphhi3VyAhwCRSchsRQOxEAXgz8wdbCLou7GcaQpUD5PZgSfyZ1mY" 
                alt="support" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm space-y-6">
                 <h3 className="font-display font-bold text-xl uppercase tracking-tight">Quick Contact</h3>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                       <div>
                          <p className="font-bold text-zinc-900">Emergency Helpline</p>
                          <p className="text-sm font-medium text-zinc-400">1-800-NAMMA-HLT</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                       <div>
                          <p className="font-bold text-zinc-900">Email Us</p>
                          <p className="text-sm font-medium text-zinc-400">care@nammahealth.com</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-[40px] shadow-lg shadow-rose-200 relative overflow-hidden">
                 <div className="relative z-10 space-y-3">
                    <h3 className="font-display font-bold text-xl">Hospital Directory</h3>
                    <p className="text-white/70 text-sm font-medium">Browse our network of 50+ network hospitals.</p>
                    <button className="bg-white text-primary px-8 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-widest mt-4 active:scale-95 transition-all">View Map</button>
                 </div>
                 <Map className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12" />
              </div>
           </div>

           <div className="lg:col-span-2">
              <form className="bg-white p-8 lg:p-12 rounded-[40px] border border-zinc-100 shadow-sm space-y-10" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Complaint Category</label>
                       <select className="w-full bg-zinc-50 h-14 border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-2xl font-bold text-zinc-700 px-4 transition-all appearance-none cursor-pointer">
                          <option>Select a category</option>
                          <option>Medical Services</option>
                          <option>Billing Issues</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Subject</label>
                       <input 
                         className="w-full bg-zinc-50 h-14 border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-2xl font-bold text-zinc-700 px-4 transition-all" 
                         placeholder="e.g. Delay in appointment" 
                         type="text" 
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Detailed Description</label>
                    <textarea 
                      rows={5} 
                      className="w-full bg-zinc-50 border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-2xl font-medium text-zinc-700 p-6 transition-all resize-none" 
                      placeholder="Please provide as much detail as possible..." 
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Supporting Documents (Optional)</label>
                    <div className="mt-2 border-2 border-dashed border-zinc-100 rounded-3xl p-10 flex flex-col items-center justify-center bg-zinc-50/50 hover:bg-rose-50/30 transition-colors cursor-pointer group">
                       <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-zinc-300 group-hover:text-primary transition-all shadow-sm mb-4">
                          <UploadCloud className="w-8 h-8" />
                       </div>
                       <p className="font-bold text-zinc-900">Click to upload or drag and drop</p>
                       <p className="text-[10px] font-extrabold text-zinc-400 uppercase mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-zinc-50">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="w-5 h-5 text-emerald-500 fill-current" />
                       <p className="text-[10px] font-bold text-zinc-400 leading-tight uppercase tracking-wider max-w-xs">Data is processed securely according to our privacy policy.</p>
                    </div>
                    <button className="w-full md:w-auto h-16 px-12 bg-primary text-white rounded-2xl font-display font-extrabold text-sm tracking-widest shadow-xl shadow-rose-100 active:scale-95 transition-all flex items-center justify-center gap-4">
                       SUBMIT REQUEST
                       <Send className="w-5 h-5" />
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
