/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Bell, Settings, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-8">
        <Link to="/admin/dashboard" className="text-xl font-display font-black text-primary tracking-tight">
          Hospital
        </Link>
        
        <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search size={18} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search Patient by ID, Phone, or Name"
            className="bg-transparent border-none focus:ring-0 text-sm w-full font-sans placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative text-slate-600">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-white"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <Settings size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <HelpCircle size={20} />
        </button>
        
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900">Dr. Arjun Reddy</p>
            <p className="text-[10px] text-slate-500 font-medium tracking-tight">Chief Admin</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&h=100&auto=format&fit=crop" 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/10 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
