import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ClipboardCheck, Map, PieChart, 
  CreditCard, ShieldAlert, MessageSquare, Settings, 
  LogOut, Bell, Search, ChevronRight, Menu, X,
  ShieldCheck, ArrowUpRight, TrendingUp, UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/fm', icon: LayoutDashboard },
  { label: 'Team Management', path: '/fm/team', icon: Users },
  { label: 'Registration Oversight', path: '/fm/oversight', icon: ClipboardCheck, badge: '12' },
  { label: 'Territory & Routes', path: '/fm/territory', icon: Map },
  { label: 'Lead Funnel', path: '/fm/funnel', icon: PieChart },
  { label: 'Card Distribution', path: '/fm/distribution', icon: CreditCard },
  { label: 'Reports & Analytics', path: '/fm/reports', icon: TrendingUp },
  { label: 'Compliance & Audit', path: '/fm/compliance', icon: ShieldAlert, badge: 'Alert' },
  { label: 'Communication', path: '/fm/communication', icon: MessageSquare },
  { label: 'Settings', path: '/fm/settings', icon: Settings },
];

export default function FMLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFD] flex font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed lg:relative z-50 w-72 h-screen bg-[#1E1E2E] text-white flex flex-col shadow-2xl"
          >
            {/* Logo */}
            <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight uppercase leading-none">NAMMA HEALTH</span>
                <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mt-1">Field Manager</span>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar space-y-1 py-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                      isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 font-bold' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="text-sm tracking-tight">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? 'bg-white text-primary' : 'bg-rose-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Profile */}
            <div className="p-6 mt-auto border-t border-white/5">
              <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-primary p-0.5">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" 
                    alt="Ravi Manager" 
                    className="w-full h-full rounded-[10px] bg-slate-800"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">Ravi Manager</p>
                  <p className="text-[10px] text-slate-400 font-medium">North Bangalore</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all active:scale-95"
            >
              {isSidebarOpen ? <Menu className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 w-80 group focus-within:bg-white focus-within:border-primary/30 transition-all">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-primary" />
              <input 
                type="text" 
                placeholder="Search team, areas, leads..." 
                className="bg-transparent border-none outline-none text-sm text-slate-600 w-full placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Stats */}
            <div className="hidden xl:flex items-center gap-6 mr-6 border-r border-slate-100 pr-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Performance</p>
                <div className="flex items-center gap-1.5 justify-end">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">92%</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Execs</p>
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-slate-700">14/15</span>
                </div>
              </div>
            </div>

            <button className="relative p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <UserCircle className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Workspace */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#FDFCFD]">
          {children}
        </main>
      </div>
    </div>
  );
}
