/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  Plus, 
  Receipt, 
  ShieldCheck, 
  FileCheck2, 
  IndianRupee,
  CreditCard,
  History,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

const services = [
  { id: 'S1', name: 'General Consultation', code: 'CNS-01', price: 500, category: 'Clinical' },
  { id: 'S2', name: 'X-Ray (Chest PA)', code: 'RAD-04', price: 1200, category: 'Radiology' },
  { id: 'S3', name: 'Complete Blood Count', code: 'LAB-12', price: 850, category: 'Laboratory' },
  { id: 'S4', name: 'ECG / EKG', code: 'CRD-02', price: 450, category: 'Clinical' },
];

export default function ServiceEntry() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (service: any) => {
    if (!cart.find(s => s.id === service.id)) {
      setCart([...cart, service]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(s => s.id !== id));
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price, 0);
  const benefitAdjustment = subtotal * 0.8; // 80% coverage example

  return (
    <div className="space-y-8 pb-12">
      {/* Patient Context Header */}
      <section className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-6 relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&h=128&auto=format&fit=crop" 
            alt="Arjun"
            className="w-20 h-20 rounded-2xl object-cover border-4 border-white/10"
          />
          <div>
            <nav className="flex gap-2 text-[10px] font-black text-white/40 mb-2 uppercase tracking-widest leading-none">
              <span>Billing Portal</span>
              <span className="text-white/20">/</span>
              <span className="text-white/60">Service Entry</span>
            </nav>
            <h2 className="text-2xl font-display font-black tracking-tight leading-none mb-2">Arjun Mehta</h2>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] font-black bg-white/10 px-2 py-0.5 rounded uppercase tracking-widest border border-white/5">NH-2024-8812</span>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Gold Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 relative z-10">
          <div className="text-right">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Available Coverage</p>
            <p className="text-2xl font-display font-black text-emerald-400">₹4,22,500</p>
          </div>
          <div className="w-px h-10 bg-white/10 self-center" />
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            <History size={16} />
            Prev Orders
          </button>
        </div>
        
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/20 to-transparent" />
      </section>

      <div className="grid grid-cols-12 gap-8">
        {/* Service Selection */}
        <section className="col-span-12 xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="text-primary" size={24} />
              <h3 className="text-xl font-display font-black text-slate-900 tracking-tight">Clinical Services</h3>
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-72 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="text-slate-400 mr-2" size={18} />
              <input type="text" placeholder="Search service code..." className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <motion.button
                key={service.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => addToCart(service)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <Plus size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight mb-1">{service.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{service.code} • {service.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">₹{service.price}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Available</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Cart Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h4 className="font-display font-bold text-slate-900">Selected Items</h4>
              <span className="text-[10px] font-black bg-primary text-white px-2 py-0.5 rounded-full">{cart.length}</span>
            </div>
            
            <div className="min-h-[320px]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center px-12">
                  <Receipt className="text-slate-200 mb-4" size={64} />
                  <p className="text-sm font-bold text-slate-400">Your checkout tray is empty.</p>
                  <p className="text-xs text-slate-300 font-medium">Select services from the list above to begin billing.</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-50/30 border-b border-slate-50">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-4">Clinical Service</th>
                      <th className="px-8 py-4">Base Charge</th>
                      <th className="px-8 py-4">Benefit Calc</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.tr 
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="hover:bg-slate-50/30 transition-colors group"
                        >
                          <td className="px-8 py-4">
                            <p className="text-sm font-bold text-slate-900 leading-tight">{item.name}</p>
                            <span className="text-[10px] font-mono font-black text-primary opacity-60">{item.code}</span>
                          </td>
                          <td className="px-8 py-4 text-sm font-bold text-slate-600">₹{item.price}</td>
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <ShieldCheck size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Covered (100%)</span>
                            </div>
                          </td>
                          <td className="px-8 py-4 text-right">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>

        {/* Payment Summary */}
        <section className="col-span-12 xl:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
             <h3 className="text-xl font-display font-black text-slate-900 tracking-tight mb-8">Order Summary</h3>
             
             <div className="space-y-4 mb-10">
               <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                 <span>Subtotal Base Items</span>
                 <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                 <span>Facility Convenience Fee</span>
                 <span className="font-bold text-slate-900">₹150</span>
               </div>
               <div className="flex justify-between items-center text-sm font-bold text-emerald-600">
                 <div className="flex items-center gap-1.5">
                   <ShieldCheck size={16} />
                   <span>Member Benefit Applied</span>
                 </div>
                 <span>- ₹{benefitAdjustment.toLocaleString()}</span>
               </div>
               <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-2xl font-display font-black text-slate-900">
                 <span>Payable Amt.</span>
                 <div className="flex items-center text-primary">
                    <IndianRupee size={20} strokeWidth={3} />
                    <span>{(subtotal + 150 - benefitAdjustment).toLocaleString()}</span>
                 </div>
               </div>
             </div>

             <div className="space-y-3 mb-10">
               <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                 <CreditCard size={20} />
                 Authorize via Namma Card
               </button>
               <button className="w-full bg-white border-2 border-slate-200 text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all outline-none">
                 Generate Cash Invoice
               </button>
             </div>

             <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
               <FileCheck2 className="text-emerald-600 mt-1" size={20} />
               <div>
                 <p className="text-xs font-bold text-emerald-900">Benefit Locked</p>
                 <p className="text-[10px] text-emerald-700/70 font-medium">This transaction will deduct ₹{benefitAdjustment.toLocaleString()} from your annual therapeutic balance.</p>
               </div>
             </div>

             <div className="absolute top-0 right-0 p-8 opacity-5">
               <IndianRupee size={120} />
             </div>
          </div>

          {/* Beneficiary Switcher Quick-view */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Beneficiary</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
                Switch Patient <ChevronDown size={12} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-primary border border-primary/10">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">Arjun Mehta</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Primary • 42 Years</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
