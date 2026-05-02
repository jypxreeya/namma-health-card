/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  ArrowLeft, 
  Edit3, 
  Printer, 
  Share2, 
  History, 
  ShieldCheck, 
  FileText, 
  Clock,
  ChevronRight,
  Stethoscope,
  Activity,
  Heart,
  Droplets,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { VisitRecord, FamilyMember } from '../../types';

const visitHistory: VisitRecord[] = [
  { id: 'V-203', date: 'Oct 12, 2023', diagnosis: 'Routine Checkup / Fever', facility: 'City General', status: 'COMPLETED' },
  { id: 'V-198', date: 'Aug 24, 2023', diagnosis: 'Allergy Screening', facility: 'South Wing Clinic', status: 'COMPLETED' },
  { id: 'V-150', date: 'Jun 02, 2023', diagnosis: 'Minor Injury Care', facility: 'City General', status: 'FOLLOW_UP' },
];

const familyMembers: FamilyMember[] = [
  { id: 'F1', name: 'Sarita Mehta', relation: 'Spouse', age: 38, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop' },
  { id: 'F2', name: 'Aarav Mehta', relation: 'Son', age: 12, avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?q=80&w=100&h=100&auto=format&fit=crop' },
];

export default function PatientProfile() {
  const { id } = useParams();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link 
          to="/admin/patients" 
          className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors transition-transform active:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Registry
        </Link>
        <div className="flex gap-2">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Share2 size={18} />
          </button>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Printer size={18} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none">
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Member Card & Info */}
        <div className="col-span-12 xl:col-span-4 space-y-8">
          {/* Member ID Card */}
          <section className="namma-card-gradient rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20">
                  <Heart size={24} className="text-white fill-white" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">Namma Card</p>
                  <p className="font-mono text-sm font-black tracking-tighter">NH-2024-8812</p>
                </div>
              </div>

              <div className="flex gap-6 mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" 
                  alt="Arjun"
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-display font-black leading-tight mb-1">Arjun Mehta</h2>
                  <p className="text-xs text-white/70 font-medium mb-3">Premium Gold Member</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-white/20 rounded-md text-[9px] font-black uppercase tracking-widest border border-white/10">Active</span>
                    <span className="px-2 py-0.5 bg-emerald-500/80 rounded-md text-[9px] font-black uppercase tracking-widest">Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1">Blood Group</p>
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className="text-rose-300" />
                    <span className="font-bold">O Positive (Rh+)</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1">Member Since</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-200" />
                    <span className="font-bold">May 2024</span>
                  </div>
                </div>
              </div>
            </div>
            
            <ShieldCheck className="absolute -right-12 -bottom-12 text-white/10 group-hover:scale-110 transition-transform duration-1000" size={240} />
          </section>

          {/* Contact & Personal Details */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Patient vitals & Personal</h3>
            
            <div className="space-y-6">
              {[
                { label: 'Primary Contact', value: '+91 98765 43210', icon: 'Phone' },
                { label: 'E-mail Address', value: 'arjun.mehta@provider.com', icon: 'Mail' },
                { label: 'Residency', value: '12th Cross, Indiranagar, KA', icon: 'Map' },
                { label: 'Emergency Contact', value: 'Sarita Mehta (Spouse)', icon: 'Users' }
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors cursor-default">{item.label}</p>
                  <p className="text-sm font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Heart Rate</p>
                <div className="flex items-center justify-center gap-1.5 text-rose-600">
                  <Activity size={14} />
                  <span className="font-black text-xl">72</span>
                  <span className="text-[10px] font-bold">bpm</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg BP</p>
                <div className="flex items-center justify-center gap-1.5 text-blue-600">
                  <Activity size={14} />
                  <span className="font-black text-xl">120/80</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: History & Coverage */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          {/* Coverage Summary */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="max-w-md relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-emerald-500" size={24} />
                <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Active Plan Coverage</h3>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-8">
                Your Namma Premium Gold subscription entitles you and your registered dependents to zero-cashless treatment at 128 network healthcare facilities.
              </p>
              <div className="flex gap-10">
                <div>
                  <p className="text-2xl font-display font-black text-slate-900">₹5,00,000</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Limit</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-black text-emerald-600">₹4,22,500</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Balance</p>
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-64 h-40 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition-all cursor-pointer group/card active:scale-95">
              <FileText className="text-slate-300 transition-transform group-hover/card:scale-110" size={32} />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">View Policy Doc</p>
              <div className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm">
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            </div>
          </section>

          {/* Clinical History Table */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="text-primary" size={20} />
                <h3 className="font-display font-bold text-slate-900">Latest Visit History</h3>
              </div>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View Medical Archive</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Ref. ID</th>
                    <th className="px-8 py-4">Visit Date</th>
                    <th className="px-8 py-4">Diagnosis / Reason</th>
                    <th className="px-8 py-4">Clinic Location</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {visitHistory.map((visit) => (
                    <tr key={visit.id} className="hover:bg-slate-50/30 transition-all cursor-pointer group">
                      <td className="px-8 py-5">
                        <span className="font-mono text-[11px] font-black text-slate-900 tracking-tighter bg-slate-100 px-2 py-0.5 rounded uppercase">
                          {visit.id}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-xs font-bold text-slate-600">{visit.date}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            visit.status === 'FOLLOW_UP' ? "bg-amber-500" : "bg-emerald-500"
                          )} />
                          <span className="text-sm font-bold text-slate-800">{visit.diagnosis}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5">
                          <Stethoscope size={14} className="text-slate-400" />
                          <span className="text-xs text-slate-500 font-medium">{visit.facility}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                          visit.status === 'COMPLETED' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        )}>
                          {visit.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Registered dependents</h3>
              <div className="grid grid-cols-2 gap-6">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:border-primary/20 hover:bg-white transition-all group">
                    <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md grayscale group-hover:grayscale-0 transition-all" />
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-900 leading-tight">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{member.relation} • {member.age}y</p>
                    </div>
                  </div>
                ))}
                <button className="flex flex-col items-center justify-center gap-3 p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-primary/40 hover:bg-rose-50/30 transition-all text-slate-300 hover:text-primary active:scale-95">
                  <ShieldCheck size={24} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Add Dependent</p>
                </button>
              </div>
            </section>

            <section className="bg-amber-50 border border-amber-100 rounded-2xl p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-amber-600" size={24} />
                  <h3 className="text-xl font-display font-black text-amber-900 tracking-tight">Renewal Advisory</h3>
                </div>
                <p className="text-sm text-amber-800/70 font-medium leading-relaxed mb-8">
                  Your primary membership expires in 45 days. Renew before Oct 24th to avoid a 15% late-fee and disruption in family benefits.
                </p>
                <div className="flex items-center gap-6">
                  <button className="bg-amber-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg active:scale-95">
                    Renew Online
                  </button>
                  <div className="flex items-center gap-2 text-amber-600">
                    <Clock size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Auto-pay eligibility</span>
                  </div>
                </div>
              </div>
              <Activity className="absolute -right-8 -bottom-8 text-amber-600/10 -rotate-12" size={160} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
