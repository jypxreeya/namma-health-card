/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ReceiptIndianRupee, 
  Package, 
  BarChart3, 
  ShieldCheck, 
  Headphones,
  PlusCircle,
  LogOut,
  Hospital
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Patients', path: '/admin/patients' },
  { icon: ReceiptIndianRupee, label: 'Billing', path: '/admin/billing' },
  { icon: Package, label: 'Inventory', path: '/admin/inventory' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: ShieldCheck, label: 'Executive Admin', path: '/admin/admin1' },
];

const secondaryItems = [
  { icon: ShieldCheck, label: 'Security', path: '/admin/security' },
  { icon: Headphones, label: 'Support', path: '/admin/support' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col py-6 scrollbar-hide overflow-y-auto z-40">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center text-primary">
            <Hospital size={18} />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900">Main Clinic</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Provider Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-6 py-3 transition-all font-medium text-sm group",
                isActive 
                  ? "bg-primary/5 text-primary border-r-4 border-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mb-6">
        <Link 
          to="/admin/checkin/verify"
          className="w-full py-3 bg-primary/10 text-primary border-2 border-primary/20 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-all text-xs"
        >
          <PlusCircle size={16} />
          New Registration
        </Link>
      </div>

      <div className="mt-auto px-2 space-y-1 border-t border-slate-100 pt-4">
        {secondaryItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 px-6 py-2.5 text-slate-500 hover:text-primary transition-colors text-sm"
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={() => navigate('/admin/login')}
          className="w-full flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-red-600 transition-colors text-sm"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
