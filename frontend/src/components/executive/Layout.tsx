import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  FileText, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search,
  Home,
  MapPin,
  ClipboardList,
  User,
  CreditCard,
  Calendar,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAuthPage = ['/login', '/reset-password', '/verify-otp'].includes(location.pathname);
  
  useEffect(() => {
    document.title = "Executive Field";
  }, []);
  
  if (isAuthPage) return <>{children}</>;

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Schedule', path: '/schedule', icon: Calendar },
    { name: 'Lead Pipeline', path: '/leads', icon: Users },
    { name: 'Field Visits', path: '/visits', icon: MapPin },
    { name: 'Registration', path: '/register', icon: UserPlus },
    { name: 'Card Registry', path: '/registry', icon: CreditCard },
    { name: 'Performance', path: '/reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-50 flex items-center px-4 md:px-8 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-50 rounded-lg md:hidden text-slate-500"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="text-primary font-display font-bold text-xl tracking-tighter uppercase whitespace-nowrap">
            Executive Field
          </Link>
          
          <div className="hidden md:flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 ml-8 max-w-md w-full focus-within:bg-white focus-within:border-primary/30 focus-within:shadow-sm transition-all group">
            <Search className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search patients, registry..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-700 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2.5 hover:bg-slate-50 rounded-xl relative text-slate-400 hover:text-primary transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">Rajesh Kumar</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Field Officer</p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" 
              alt="Profile" 
              className="w-10 h-10 rounded-xl border-2 border-slate-50 object-cover shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* Navigation Drawer (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white border-r border-slate-100 z-[70] flex flex-col p-6 md:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display font-bold text-2xl text-primary tracking-tighter uppercase">Executive Field</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 p-2 hover:bg-slate-50 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-medium ${
                      location.pathname === item.path 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-display">{item.name}</span>
                  </button>
                ))}
              </nav>
              <button 
                onClick={() => navigate('/login')}
                className="mt-auto flex items-center gap-3.5 px-4 py-3 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-display">Logout</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar (Desktop) */}
      <aside className="fixed left-0 top-16 bottom-0 w-[240px] bg-white border-r border-slate-100 z-40 hidden md:flex flex-col p-6">
        <nav className="flex-1 space-y-1.5">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-6 px-4">Menu</div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all group font-bold ${
                location.pathname === item.path 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`} />
              <span className="font-display text-sm tracking-tight">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-emerald-50 p-4 rounded-2xl mb-6 flex items-center justify-between">
            <div>
              <p className="text-emerald-900 font-bold text-[10px] uppercase tracking-widest leading-none mb-1.5">System Status</p>
              <p className="text-emerald-600 text-xs font-bold">Operational</p>
            </div>
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3.5 px-4 py-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-bold"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-display text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 md:pl-[240px] min-h-screen flex flex-col relative z-10">
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>

        {/* Bottom Navigation (Mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <Link to="/" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-slate-400'}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
          </Link>
          <Link to="/leads" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${location.pathname === '/leads' ? 'text-primary' : 'text-slate-400'}`}>
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Leads</span>
          </Link>
          <Link to="/register" className={`flex flex-col items-center gap-1.5 p-2 -mt-10 group`}>
            <div className="bg-primary text-white p-5 rounded-3xl shadow-xl shadow-primary/30 active:scale-95 transition-all">
              <UserPlus className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Register</span>
          </Link>
          <Link to="/visits" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${location.pathname === '/visits' ? 'text-primary' : 'text-slate-400'}`}>
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Visits</span>
          </Link>
          <Link to="/reports" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${location.pathname === '/reports' ? 'text-primary' : 'text-slate-400'}`}>
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Reports</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
