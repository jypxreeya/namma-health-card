/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Search, 
  Filter, 
  QrCode, 
  Download, 
  ArrowUpDown, 
  FileText, 
  TrendingUp, 
  UserPlus, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Patient } from '../../types';

const patients: Patient[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    nammaId: 'NH-2024-8812',
    age: 42,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    email: 'arjun.m@provider.com',
    location: 'Bengaluru, KA',
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    nammaId: 'NH-2022-4401',
    age: 29,
    gender: 'Female',
    bloodGroup: 'A-',
    phone: '+91 88221 00456',
    email: 'priya.sh@domain.com',
    location: 'Mysuru, KA',
    status: 'EXPIRED',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Vikram Kumar',
    nammaId: 'NH-2024-9904',
    age: 65,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 91102 33445',
    email: 'vikram.k@test.com',
    location: 'Hubballi, KA',
    status: 'PENDING'
  }
];

export default function PatientSearch() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="flex gap-2 text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
            <span>Registry</span>
            <span className="text-primary opacity-30">/</span>
            <span className="text-primary">Patient Search</span>
          </nav>
          <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight">Patient Search</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Retrieve and manage patient records across the Namma Health network.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold text-slate-600 shadow-sm transition-hover">
            <Filter size={16} />
            Advanced Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <QrCode size={18} />
            Scan QR Code
          </button>
        </div>
      </header>

      {/* Search Grid */}
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-center">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={24} />
            <input 
              type="text"
              placeholder="Search by Namma Card ID, Phone Number, or Patient Name..."
              className="w-full pl-16 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-lg font-medium transition-all outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-6 items-center">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Suggestions:</span>
            {['NH-8829-10', 'Aadhaar Verified', 'Recent Patients'].map(tag => (
              <button key={tag} className="text-[11px] font-bold text-primary hover:underline transition-all outline-none">
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 bg-[#4a1c22] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-between group shadow-xl">
          <div className="z-10">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-widest mb-4">Membership Levels</h3>
            <div className="flex flex-wrap gap-2">
              {['Premium Gold', 'Standard', 'Govt Scheme'].map((level, i) => (
                <span key={level} className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md",
                  i === 0 ? "bg-white/30" : "bg-white/10"
                )}>
                  {level}
                </span>
              ))}
            </div>
          </div>
          
          <div className="z-10 mt-8">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-widest mb-4">Recent Visits</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/20 border border-white/20 uppercase tracking-widest">Today</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/10 border border-white/20 uppercase tracking-widest">Last 7 Days</span>
            </div>
          </div>

          <FileText className="absolute -right-6 -bottom-6 text-white/10 rotate-12 transition-transform duration-700 group-hover:rotate-0" size={160} />
        </section>
      </div>

      {/* Table Section */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-display font-bold text-slate-900">
            Patient Records <span className="text-slate-400 font-normal ml-2">(128 Results)</span>
          </h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-500"><Download size={18} /></button>
            <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-500"><ArrowUpDown size={18} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/30 border-b border-slate-50">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Namma Card ID</th>
                <th className="px-8 py-5">Patient Name</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-primary/5 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <CreditCard size={18} />
                      </div>
                      <span className="font-mono text-xs font-black text-primary tracking-tighter">
                        {patient.nammaId}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      {patient.avatar ? (
                        <img src={patient.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 capitalize">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <p className="font-display font-bold text-slate-900 text-sm leading-none mb-1">{patient.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Age: {patient.age} | Group: {patient.bloodGroup}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-bold text-slate-700">{patient.phone}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{patient.email}</p>
                  </td>
                  <td className="px-8 py-5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {patient.location}
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-2",
                      patient.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      patient.status === 'EXPIRED' ? "bg-rose-50 text-rose-700 border-rose-100" :
                      "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link 
                      to={`/patients/${patient.id}`}
                      className="text-primary font-black text-[11px] hover:underline uppercase tracking-tighter transition-all inline-flex items-center gap-1 group/btn"
                    >
                      {patient.status === 'ACTIVE' ? 'View Record' : patient.status === 'EXPIRED' ? 'Renew Card' : 'Verify Identity'}
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-8 py-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <p>Showing 1 to 10 of 128 results</p>
            <div className="flex gap-2">
              <button disabled className="p-2 border border-slate-100 rounded-lg opacity-50"><ChevronLeft size={14} /></button>
              <button className="px-4 py-1 bg-primary text-white rounded-lg shadow-md shadow-primary/20">1</button>
              <button className="px-4 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all">2</button>
              <button className="px-4 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all">3</button>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all"><ChevronRight size={14} /></button>
            </div>
          </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-primary">
              <TrendingUp size={24} />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-900 leading-none mb-1">Search Trends</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Daily verification volume</p>
            </div>
          </div>
          <div className="h-32 flex items-end gap-1.5 px-2">
            {[30, 45, 25, 75, 100, 85, 40].map((h, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 rounded-t-sm transition-all duration-1000",
                  i === 4 ? "bg-primary" : "bg-rose-100"
                )} 
                style={{ height: `${h}%` }} 
              />
            ))}
          </div>
          <p className="text-[11px] text-primary/60 font-bold uppercase tracking-widest mt-6 italic">High activity detected today (24% increase)</p>
        </div>

        <div className="md:col-span-8 bg-slate-950 rounded-2xl p-10 text-white relative overflow-hidden flex flex-col justify-center shadow-2xl">
          <div className="max-w-md relative z-10">
            <h4 className="text-3xl font-display font-black leading-tight mb-4 tracking-tighter">Need to register a new clinic?</h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
              Expanding your healthcare network is simple. Our practitioner onboarding workflow is now live for all regional centers.
            </p>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl">
              Onboard Provider
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-2/5 p-12 opacity-10 flex items-center justify-center">
            <UserPlus size={240} className="text-white" />
          </div>
        </div>
      </div>

      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all group z-50">
        <UserPlus size={28} />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Quick Register Patient
        </span>
      </button>
    </div>
  );
}
