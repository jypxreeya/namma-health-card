import { ChevronLeft, Edit2, Verified, Fingerprint, Calendar, Settings, Lock, Globe, Bell, ShieldCheck, Mail, Home, Phone, Trash2, FileText, Share2, ArrowRight, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/Navigation';
import { cn } from '../lib/utils';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface pb-32">
      <header className="bg-white sticky top-0 z-50 border-b border-zinc-100 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-rose-50 rounded-full text-primary">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display font-bold text-lg text-primary tracking-tight">Personal Profile</h1>
        </div>
        <button onClick={() => navigate('/security')} className="p-2 text-primary hover:bg-rose-50 rounded-full">
           <Settings className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-8 space-y-10">
        {/* Profile Header Section */}
        <section>
          <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative group">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-rose-50 shadow-lg">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApBwu1QQaSqa0TsY92Kh_Dn34KAIT2LEtr_hO6z2bc8Qojiwna3ER9aEzaxl_EXIc8HUmiShUI7YT8Nfy3F84mqrqMpzNX5W3n1sNTl9J88a7wkoWZ-fjsYJ33RLq_x69fghZwaXIgLFBzChanmTN1pBj6kZ7hp79-lzN6TLd1vrPR2JulAqKkbTjxIK9eInVpSYgtQ_-sKqh6VwktD2brU0GVZfq_wNBOsgaxw6KdpreOWLa6cW1oYfww6w0q8xTBxrR_E8L7SOE" 
                  className="w-full h-full object-cover" 
                  alt="Avatar" 
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary p-2.5 rounded-full text-white shadow-xl border-4 border-white hover:scale-110 transition-transform">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h2 className="font-display font-extrabold text-2xl tracking-tight">Aditi Sharma</h2>
                <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-primary px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-primary/10">
                  <Verified className="w-3.5 h-3.5 fill-current" />
                  Gold Member
                </span>
              </div>
              <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Patient ID: NH-8923-2024</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Calendar className="w-5 h-5 text-primary opacity-60" />
                  <span className="text-sm font-bold">32 Years</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Home className="w-5 h-5 text-primary opacity-60" />
                  <span className="text-sm font-bold">Bangalore, IN</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/card-detail')}
              className="w-full md:w-auto px-8 h-14 bg-primary text-white rounded-full font-bold text-sm tracking-wide shadow-lg shadow-rose-100 hover:shadow-rose-200 transition-all flex items-center justify-center gap-3"
            >
              <Share2 className="w-5 h-5" />
              Digital Health Card
            </button>
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-bold text-xl flex items-center gap-3">
                <User className="w-6 h-6 text-primary" />
                Personal Details
              </h3>
              <button className="text-primary font-extrabold text-[10px] uppercase tracking-widest hover:underline">Edit</button>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Full Name', value: 'Aditi Sharma' },
                { label: 'Date of Birth', value: '14 May 1992' },
                { label: 'Gender', value: 'Female' },
                { label: 'Blood Group', value: 'O+ Positive', color: 'text-primary font-bold' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-zinc-400">{item.label}</span>
                  <span className={cn("text-on-surface font-bold", item.color)}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-bold text-xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Healthcare Identity
              </h3>
              <button className="text-primary font-extrabold text-[10px] uppercase tracking-widest hover:underline">Manage</button>
            </div>
            <div className="space-y-6">
              <div className="p-5 bg-surface-container-low rounded-2xl flex items-center gap-4 border border-zinc-100/50">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <Fingerprint className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-0.5">Aadhar Linked Status</p>
                  <p className="text-sm font-bold flex items-center gap-1.5">
                    Verified Successfully
                    <Verified className="w-4 h-4 text-emerald-600 fill-current" />
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-50 pb-4">
                <span className="text-sm font-medium text-zinc-400">Membership ID</span>
                <span className="text-sm font-mono font-bold">NAMMA-GOLD-8211</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-400">Health Vault Space</span>
                <span className="text-sm font-bold font-display">2.4 GB / 5.0 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <section className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm space-y-8">
           <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xl flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Contact Information
              </h3>
              <button className="text-primary font-extrabold text-[10px] uppercase tracking-widest hover:underline">Edit Info</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-primary">
                   <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-[0.2em] mb-2">Mobile Number</p>
                  <p className="font-display font-bold text-lg leading-tight uppercase tracking-tight">+91 98XXX X0211</p>
                  <span className="inline-flex items-center gap-1 mt-2 text-[8px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded tracking-widest uppercase border border-emerald-100">
                    <Verified className="w-2.5 h-3" /> Verified
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-primary">
                   <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-[0.2em] mb-2">Email Address</p>
                  <p className="font-bold text-sm tracking-tight text-on-surface-variant">aditi.s@nammahealth.com</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-primary">
                   <Home className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-[0.2em] mb-2">Residential Address</p>
                  <p className="text-zinc-500 font-medium text-sm leading-relaxed">12th Cross, HSR Layout, Bengaluru, Karnataka - 560102</p>
                </div>
              </div>
            </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="bg-error-container/10 border border-error/20 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display font-bold text-xl text-error mb-2 flex items-center justify-center md:justify-start gap-2">
                <Lock className="w-5 h-5" />
                Data Privacy
              </h4>
              <p className="text-sm font-medium text-on-surface-variant max-w-sm">Request a copy of your medical data or deactivate your portal access.</p>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 h-14 rounded-full border-2 border-error text-error font-bold text-sm hover:bg-error/5 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout System
            </button>
            <button className="px-8 h-14 rounded-full border-2 border-error text-error font-bold text-sm hover:bg-error/5 transition-all">
              Request Data
            </button>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
