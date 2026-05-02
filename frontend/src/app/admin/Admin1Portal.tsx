import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  CreditCard,
  ReceiptText,
  BarChart3,
  Bell,
  Settings,
  HelpCircle,
  Search,
  Plus,
  Filter,
  Download,
  ArrowRight,
  MessageSquare,
  Shield,
  ListFilter,
  QrCode,
  MoreVertical,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  ExternalLink,
  Users,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Trash2,
  FileText,
  Mail,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Lock,
  Globe,
  Activity,
  TrendingUp,
  TrendingDown,
  LogOut
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 
 * --- STYLES & UTILS --- 
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 
 * --- TYPES --- 
 */
type PortalContext = 'admin' | 'compliance';
type View = 
  | 'card-mgmt' 
  | 'card-detail' 
  | 'analytics-utilization' 
  | 'billing-logs' 
  | 'analytics-overview' 
  | 'message-templates' 
  | 'comm-centre' 
  | 'delivery-logs' 
  | 'access-audit' 
  | 'billing-corrections' 
  | 'security-governance';

/**
 * --- MOCK DATA ---
 */
const CARD_DATA = [
  { id: '#NH-9042-1', name: 'Arjun Rajasekharan', level: 'Premium', expiry: 'Oct 12, 2024', status: 'Active', type: 'Health Card' },
  { id: '#NH-8821-4', name: 'Meera Iyer', level: 'Standard', expiry: 'Nov 05, 2024', status: 'Expiring Soon', type: 'Health Card' },
  { id: '#NH-7732-2', name: 'Vikram Singh', level: 'Platinum', expiry: 'Aug 22, 2025', status: 'Active', type: 'Membership Card' },
  { id: '#NH-6610-9', name: 'Sanya Mirza', level: 'Premium', expiry: 'Dec 15, 2023', status: 'Expired', type: 'Health Card' },
  { id: '#NH-5502-3', name: 'Rahul Dravid', level: 'Standard', expiry: 'Jan 10, 2025', status: 'Active', type: 'Health Card' },
];

const ANALYTICS_DATA = {
  serviceDistribution: [
    { name: 'Diagnostics', value: 45, color: '#af101a' },
    { name: 'Consultations', value: 30, color: '#e11d48' },
    { name: 'Pharmacy', value: 25, color: '#fb7185' },
  ],
  revenueTrends: [
    { month: 'Jun', rev: 4200, proj: 3800 },
    { month: 'Jul', rev: 5500, proj: 4200 },
    { month: 'Aug', rev: 4800, proj: 5000 },
    { month: 'Sep', rev: 7200, proj: 6000 },
    { month: 'Oct', rev: 6800, proj: 6500 },
  ],
  utilizationHeatmap: [
    { day: 'Mon', usage: 82 }, { day: 'Tue', usage: 65 }, { day: 'Wed', usage: 94 },
    { day: 'Thu', usage: 78 }, { day: 'Fri', usage: 91 }, { day: 'Sat', usage: 45 }, { day: 'Sun', usage: 30 },
  ],
  billingSummary: [
    { name: 'May', value: 120000 },
    { name: 'Jun', value: 145000 },
    { name: 'Jul', value: 182000 },
    { name: 'Aug', value: 128000 },
    { name: 'Sep', value: 159000 },
    { name: 'Oct', value: 210000 },
  ]
};

const MESSAGE_TEMPLATES = [
  { id: 1, type: 'WhatsApp', title: 'Appointment Confirmation', tag: 'Automated', performance: '98%' },
  { id: 2, type: 'SMS', title: 'Billing Reminder', tag: 'High Priority', performance: '92%' },
  { id: 3, type: 'Email', title: 'Annual Health Checkup', tag: 'Campaign', performance: '85%' },
  { id: 4, type: 'WhatsApp', title: 'Medicine Refill Alert', tag: 'AI Powered', performance: '96%' },
];

/**
 * --- COMPONENT: UI PRIMITIVES ---
 */

const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info', className?: string }) => {
  const styles = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    error: "bg-rose-50 text-rose-700 font-bold italic",
    info: "bg-blue-50 text-blue-700",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1", styles[variant], className)}>
      {variant === 'success' && <CheckCircle2 className="w-3 h-3" />}
      {variant === 'error' && <AlertCircle className="w-3 h-3" />}
      {children}
    </span>
  );
};

const Card = ({ children, className, noPadding = false }: { children: React.ReactNode, className?: string, noPadding?: boolean }) => (
  <div className={cn("bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm", className)}>
    <div className={cn(!noPadding && "p-6")}>
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title, description, badge }: { title: string, description?: string, badge?: string }) => (
  <div className="mb-8 flex flex-col gap-1">
    <div className="flex items-center gap-3">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-['Public_Sans'] leading-none">{title}</h2>
      {badge && <Badge variant="error" className="h-fit">{badge}</Badge>}
    </div>
    {description && <p className="text-slate-500 font-medium text-sm">{description}</p>}
  </div>
);

/**
 * --- SHARED LAYOUT: SIDEBAR ---
 */

const Sidebar = ({ view, setView, context }: { view: View, setView: (v: View) => void, context: PortalContext }) => {
  const menuItems = useMemo(() => {
    if (context === 'admin') return [
      { id: 'analytics-overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'card-mgmt', label: 'Card Management', icon: CreditCard },
      { id: 'analytics-utilization', label: 'Service Analytics', icon: BarChart3 },
      { id: 'billing-logs', label: 'Billing & Logs', icon: ReceiptText },
      { id: 'comm-centre', label: 'Communication Hub', icon: MessageSquare },
    ];
    return [
      { id: 'access-audit', label: 'Access Audit', icon: Lock },
      { id: 'billing-corrections', label: 'Billing Corrections', icon: FileText },
      { id: 'security-governance', label: 'Governance', icon: Shield },
    ];
  }, [context]);

  return (
    <aside className="w-64 h-screen border-r border-slate-200 bg-white fixed left-0 top-0 z-50 flex flex-col py-8">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-rose-700 rounded-xl flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-rose-200">
          NH
        </div>
        <div>
          <h1 className="text-sm font-black tracking-tighter text-slate-900 uppercase">Namma Health</h1>
          <p className="text-[10px] font-bold text-rose-700 tracking-[0.2em] uppercase opacity-80">{context === 'admin' ? 'Admin Portal' : 'Compliance Portal'}</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium",
              view === item.id 
                ? "bg-rose-700 text-white shadow-md shadow-rose-100" 
                : "text-slate-500 hover:text-rose-600 hover:bg-rose-50"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 pt-6 border-t border-slate-100 mt-auto">
        <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">Dr. Shreya Rao</p>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Admin</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400" />
        </div>
        <button 
          onClick={() => window.location.href = '/login'} 
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
        >
          <LogOut className="w-4 h-4" />
          LOGOUT SYSTEM
        </button>
      </div>
    </aside>
  );
};

const Header = ({ viewName }: { viewName: string }) => (
  <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{viewName}</span>
      <div className="h-4 w-px bg-slate-300"></div>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-rose-400 transition-colors" />
        <input 
          className="bg-slate-100/50 border-none rounded-full pl-10 pr-4 py-1.5 text-xs w-64 focus:ring-2 focus:ring-rose-500/20" 
          placeholder="System Command / Search..." 
        />
      </div>
    </div>
    <div className="flex items-center gap-6">
       <div className="flex items-center gap-1.5 text-emerald-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">System Live</span>
       </div>
       <div className="flex items-center gap-4 border-l pl-6">
          <button className="relative text-slate-400 hover:text-rose-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button className="text-slate-400 hover:text-rose-600"><HelpCircle className="w-5 h-5" /></button>
       </div>
    </div>
  </header>
);

/**
 * --- VIEW: OVERVIEW ---
 */

const OverviewView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <SectionHeader 
      title="Facility Overview" 
      description="Live surveillance of all Namma Health subsystems and membership activity." 
      badge="Live Feed"
    />

    <div className="grid grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Revenue', value: '₹4.2M', trend: '+12.5%', isUp: true, icon: ReceiptText },
        { label: 'Active Cards', value: '12,842', trend: '+45', isUp: true, icon: CreditCard },
        { label: 'Benefit Claims', value: '3,102', trend: '-2.1%', isUp: false, icon: Zap },
        { label: 'Compliance Index', value: '98.2%', trend: 'Optimal', isUp: true, icon: Shield },
      ].map((stat, i) => (
        <Card key={i} className="hover:border-rose-200 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-700 group-hover:bg-rose-700 group-hover:text-white transition-all">
              <stat.icon className="w-5 h-5" />
            </div>
            <span className={cn("text-xs font-bold", stat.isUp ? "text-emerald-600" : "text-rose-600")}>
              {stat.trend}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black mt-1 leading-none">{stat.value}</h3>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-8">
      <Card className="col-span-2">
         <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-lg">Revenue Trajectory</h4>
            <select className="text-xs border rounded-lg px-2 py-1 bg-slate-50 font-bold uppercase tracking-wider">
               <option>Last 6 Months</option>
               <option>Year to Date</option>
            </select>
         </div>
         <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA.revenueTrends}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#af101a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#af101a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="rev" stroke="#af101a" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="proj" stroke="#cbd5e1" strokeWidth={1} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </Card>

      <div className="space-y-6">
        <Card className="bg-rose-900 border-rose-900 text-white overflow-visible relative">
           <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
           <h4 className="font-black text-rose-300 text-[10px] uppercase tracking-[0.2em] mb-4">Critical Alerts</h4>
           <div className="space-y-4">
              <div className="bg-white/10 p-3 rounded-lg border border-white/5 flex gap-3 items-start">
                 <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                 <div>
                    <p className="text-xs font-bold">API Outage Detected</p>
                    <p className="text-[10px] opacity-60 mt-1 uppercase font-black">Branch: Mumbai North</p>
                 </div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/5 flex gap-3 items-start">
                 <Lock className="w-5 h-5 text-rose-400 shrink-0" />
                 <div>
                    <p className="text-xs font-bold">Failed Login Spikes</p>
                    <p className="text-[10px] opacity-60 mt-1 uppercase font-black">IP Blockage Recommended</p>
                 </div>
              </div>
           </div>
           <button className="w-full mt-6 py-2 bg-white text-rose-900 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-colors">
              Manage Incident Centre
           </button>
        </Card>

        <Card>
           <h4 className="font-bold text-sm mb-4">Live Department Throughput</h4>
           <div className="space-y-4">
              {[
                { name: 'Radiology', load: 88, color: 'bg-rose-600' },
                { name: 'ER Intake', load: 42, color: 'bg-emerald-500' },
                { name: 'Pharmacy', load: 95, color: 'bg-amber-500' },
              ].map((dept, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-1.5 opacity-60">
                    <span>{dept.name}</span>
                    <span>{dept.load}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.load}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={cn("h-full rounded-full shadow-sm", dept.color)} 
                    />
                  </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  </div>
);

/**
 * --- VIEW: CARD MANAGEMENT ---
 */

const CardMgmtView = ({ onSelectCard }: { onSelectCard: (id: string) => void }) => (
  <div className="animate-in fade-in zoom-in-95 duration-500">
    <div className="flex justify-between items-end mb-8">
      <SectionHeader 
        title="Card Management" 
        description="Lifecycle tracking and issuance of patient membership assets." 
      />
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-200">
          <Download className="w-4 h-4" /> Export Register
        </button>
        <button className="px-4 py-2 bg-rose-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-rose-200 hover:bg-rose-800">
          <Plus className="w-4 h-4" /> Issue Asset
        </button>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-8 mb-10">
      <div className="col-span-2">
        <Card noPadding>
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h4 className="font-bold text-lg">Active Card Inventory</h4>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input className="bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs w-48" placeholder="Search by ID or Name..." />
              </div>
              <button className="p-2 border rounded-lg bg-white"><Filter className="w-4 h-4 text-slate-400" /></button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b text-[10px] uppercase font-black text-slate-400 tracking-widest">
                <th className="px-6 py-4">ID Reference</th>
                <th className="px-6 py-4">Asset Primary</th>
                <th className="px-6 py-4">Valid Until</th>
                <th className="px-6 py-4">Operational Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CARD_DATA.map((card) => (
                <tr key={card.id} className="hover:bg-rose-50/30 transition-colors group cursor-pointer" onClick={() => onSelectCard(card.id)}>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400 group-hover:text-rose-700">{card.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center font-bold text-rose-700 text-[10px]">
                        {card.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none">{card.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{card.level} Level</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 italic">{card.expiry}</td>
                  <td className="px-6 py-4">
                    <Badge variant={card.status === 'Active' ? 'success' : card.status === 'Expired' ? 'error' : 'warning'}>
                      {card.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-slate-50/50 border-t flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying 5 of 12,842 records</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded text-[10px] font-bold uppercase bg-white disabled:opacity-30" disabled>Prev</button>
              <button className="px-3 py-1 border rounded text-[10px] font-bold uppercase bg-white">Next</button>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="bg-rose-700 rounded-3xl p-8 text-white relative h-[400px] flex flex-col justify-between overflow-hidden shadow-2xl shadow-rose-200 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-white/10"></div>
          <div className="relative z-10">
             <div className="flex justify-between items-start mb-12">
               <h3 className="text-sm font-black uppercase tracking-[0.3em] opacity-80 italic">Digital Asset Preview</h3>
               <QrCode className="w-6 h-6 opacity-30" />
             </div>
             <div>
               <div className="text-[10px] uppercase font-black tracking-[0.2em] text-rose-300 mb-2 italic">Official Membership</div>
               <h2 className="text-4xl font-bold tracking-tighter leading-none italic">NAMMA<br/>HEALTH</h2>
             </div>
          </div>
          <div className="relative z-10 flex justify-between items-end">
             <div>
                <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Card Holder</p>
                <p className="text-lg font-bold tracking-tight">ARJUN RAJASEKHARAN</p>
             </div>
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md flex items-center justify-center rounded-xl font-black text-xs italic">PRO</div>
          </div>
        </div>

        <Card className="bg-slate-900 border-slate-900 text-white">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-4 italic">Action Required</p>
           <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg leading-none">24</div>
                 <div className="flex-1">
                    <p className="text-xs font-bold truncate">Physical Dispatch Pending</p>
                    <p className="text-[10px] opacity-40 uppercase font-black">Requires Labelling</p>
                 </div>
                 <ArrowRight className="w-4 h-4 text-rose-500" />
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg leading-none">03</div>
                 <div className="flex-1">
                    <p className="text-xs font-bold truncate">Level Upgrade Requests</p>
                    <p className="text-[10px] opacity-40 uppercase font-black">Needs Approval</p>
                 </div>
                 <ArrowRight className="w-4 h-4 text-rose-500" />
              </div>
           </div>
        </Card>
      </div>
    </div>
  </div>
);

/**
 * --- VIEW: SEC & GOVERNANCE ---
 */

const SecurityGovernanceView = () => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
    <SectionHeader 
      title="Security & Data Governance" 
      description="Administrative control over sensitive information and access policies." 
    />

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 space-y-8">
         <Card>
            <div className="flex justify-between items-center mb-8 border-b pb-6">
               <h4 className="font-bold flex items-center gap-3">
                 <Shield className="w-5 h-5 text-rose-700" />
                 Global Compliance Toggles
               </h4>
               <Badge variant="success">All Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
               {[
                 { label: '2FA Mandatory Enforcement', desc: 'Require all administrative users to use hardware keys or TOTP.', active: true },
                 { label: 'PHI Masking in Analytics', desc: 'Anonymize patient data in all visual analytics exported.', active: true },
                 { label: 'Audit Log Immutability', desc: 'Securely seal audit logs after 24 hours of generation.', active: false },
                 { label: 'GDPR Data Portability', desc: 'Allow automated patient-side data extractions.', active: true },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-start">
                    <div className="max-w-[200px]">
                       <p className="text-sm font-bold text-slate-900 leading-tight">{item.label}</p>
                       <p className="text-[10px] text-slate-400 font-medium mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <button className={cn("w-10 h-5 rounded-full relative transition-colors p-1", item.active ? "bg-rose-700" : "bg-slate-200")}>
                       <motion.div 
                        animate={{ x: item.active ? 20 : 0 }}
                        className="w-3 h-3 bg-white rounded-full shadow-sm" 
                       />
                    </button>
                 </div>
               ))}
            </div>
         </Card>

         <Card noPadding>
            <div className="p-6 border-b">
               <h4 className="font-bold">Branch Access Restrictions</h4>
            </div>
            <table className="w-full text-left">
               <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest ">
                  <tr>
                    <th className="px-6 py-4">Branch Office</th>
                    <th className="px-6 py-4">IP Range Restricted</th>
                    <th className="px-6 py-4">Time Window</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y text-xs font-semibold">
                  <tr>
                    <td className="px-6 py-4">Mumbai North - HDFC Wing</td>
                    <td className="px-6 py-4 font-mono text-rose-700">192.168.*.*</td>
                    <td className="px-6 py-4 italic">08:00 - 22:00</td>
                    <td className="px-6 py-4"><Badge variant="success">Enforced</Badge></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Chennai - Velachery Hub</td>
                    <td className="px-6 py-4 font-mono text-rose-700">10.0.*.*</td>
                    <td className="px-6 py-4 italic">24 / 7 Live</td>
                    <td className="px-6 py-4"><Badge variant="warning">Monitoring</Badge></td>
                  </tr>
               </tbody>
            </table>
         </Card>
      </div>

      <div className="col-span-4 space-y-6">
         <Card className="bg-slate-50 border-dashed border-2">
            <h4 className="font-bold text-sm mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-700" />
              Granular Role Permissions
            </h4>
            <div className="space-y-3">
               {['Chief Administrator', 'Medical Auditor', 'Billing Lead', 'Staff Nurse'].map((role, i) => (
                 <div key={i} className={cn("p-4 rounded-xl border flex justify-between items-center transition-all bg-white hover:border-rose-400", i === 0 ? "border-rose-700 ring-2 ring-rose-50" : "border-slate-100")}>
                    <span className="text-xs font-bold">{role}</span>
                    <button className="text-[10px] font-black uppercase text-rose-700 italic">Configure</button>
                 </div>
               ))}
               <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-xs font-bold hover:border-rose-300 hover:text-rose-500 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Define New Role
               </button>
            </div>
         </Card>

         <Card className="bg-rose-50 border-rose-200">
            <div className="flex gap-4 items-start">
               <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <Lock className="w-6 h-6 text-rose-700" />
               </div>
               <div>
                  <h5 className="text-sm font-bold text-rose-900 italic">Patient Data Consent</h5>
                  <p className="text-[10px] text-rose-700 font-medium mt-1 leading-relaxed">System-wide enforcement of P-DAC compliance for all electronic health record requests.</p>
                  <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-rose-800 border-b-2 border-rose-200 pb-0.5 hover:gap-3 transition-all">
                    Review Consent History <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
            </div>
         </Card>
      </div>
    </div>
  </div>
);

/**
 * --- VIEW: BILLING & LOGS ---
 */

const BillingLogsView = () => (
  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
    <SectionHeader 
      title="Financial Audit & Billing" 
      description="Detailed ledger of health card transactions and reconciliation logs." 
    />

    <div className="grid grid-cols-3 gap-8 mb-8">
      <div className="col-span-2">
        <Card noPadding>
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h4 className="font-bold">Transaction History</h4>
            <div className="flex gap-2">
               <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input className="pl-8 pr-4 py-1.5 border rounded-lg text-xs w-48" placeholder="TXN Reference..." />
               </div>
               <button className="p-2 border rounded-lg bg-white"><Download className="w-4 h-4 text-slate-400" /></button>
            </div>
          </div>
          <table className="w-full text-left">
             <thead>
                <tr className="bg-slate-50/80 border-b text-[10px] uppercase font-black text-slate-400 tracking-widest">
                   <th className="px-6 py-4">TXN ID</th>
                   <th className="px-6 py-4">Beneficiary</th>
                   <th className="px-6 py-4">Amount</th>
                   <th className="px-6 py-4">Type</th>
                   <th className="px-6 py-4">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y text-xs font-semibold">
                {[
                  { id: 'TXN-9021', name: 'Rahul Dravid', amt: '₹12,400', type: 'Renewal', status: 'Success' },
                  { id: 'TXN-8842', name: 'Meera Iyer', amt: '₹4,500', type: 'Consultation', status: 'Pending' },
                  { id: 'TXN-7710', name: 'Vikram Singh', amt: '₹8,200', type: 'Diagnostics', status: 'Success' },
                ].map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-mono text-slate-400">{txn.id}</td>
                     <td className="px-6 py-4">{txn.name}</td>
                     <td className="px-6 py-4 font-bold text-slate-900">{txn.amt}</td>
                     <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] uppercase">{txn.type}</span></td>
                     <td className="px-6 py-4">
                        <Badge variant={txn.status === 'Success' ? 'success' : 'warning'}>{txn.status}</Badge>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
           <h4 className="font-bold text-sm mb-4">Allocation by Service</h4>
           <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={ANALYTICS_DATA.serviceDistribution}
                       cx="50%" cy="50%"
                       innerRadius={40} outerRadius={60}
                       paddingAngle={5}
                       dataKey="value"
                    >
                       {ANALYTICS_DATA.serviceDistribution.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 space-y-2">
              {ANALYTICS_DATA.serviceDistribution.map((s, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }}></div>
                      <span>{s.name}</span>
                   </div>
                   <span className="text-slate-500">{s.value}%</span>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  </div>
);

/**
 * --- VIEW: COMMUNICATION HUB ---
 */

const CommCentreView = () => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
    <SectionHeader 
      title="Communication Hub" 
      description="Automate patient outreach through SMS, WhatsApp, and Email triggers." 
    />

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8">
         <Card noPadding>
            <div className="p-6 border-b flex justify-between items-center">
               <h4 className="font-bold">Message Templates</h4>
               <button className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg">
                  <Plus className="w-3.5 h-3.5" /> Create New
               </button>
            </div>
            <div className="divide-y">
               {MESSAGE_TEMPLATES.map((tmpl) => (
                 <div key={tmpl.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex gap-4 items-center">
                       <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                          {tmpl.type === 'WhatsApp' ? <MessageSquare className="w-5 h-5" /> : tmpl.type === 'Email' ? <Mail className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                       </div>
                       <div>
                          <h5 className="text-sm font-bold text-slate-900">{tmpl.title}</h5>
                          <div className="flex gap-2 mt-1">
                             <Badge variant="info">{tmpl.tag}</Badge>
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tmpl.type}</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-emerald-600 italic">Perf: {tmpl.performance}</p>
                       <button className="text-[10px] font-black uppercase text-rose-700 mt-2">Edit Template</button>
                    </div>
                 </div>
               ))}
            </div>
         </Card>
      </div>

      <div className="col-span-4 space-y-6">
        <Card className="bg-slate-900 text-white border-slate-900">
           <h4 className="text-sm font-black uppercase tracking-[0.2em] text-rose-400 mb-6 italic">Delivery Pulse</h4>
           <div className="space-y-6">
              {[
                { label: 'Outbound Queue', val: 1420, trend: 'Normal' },
                { label: 'Failed Triggers', val: 12, trend: 'Requires Attention', error: true },
                { label: 'Latency', val: '0.4s', trend: 'Global' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4 last:border-0 last:pb-0">
                   <div>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{item.label}</p>
                      <h5 className={cn("text-xl font-bold mt-1", item.error && "text-rose-500")}>{item.val}</h5>
                   </div>
                   <span className={cn("text-[8px] font-black uppercase italic px-2 py-0.5 rounded", item.error ? "bg-rose-500 text-white" : "text-emerald-400")}>
                      {item.trend}
                   </span>
                </div>
              ))}
           </div>
        </Card>

        <Card>
           <h4 className="font-bold text-sm mb-4">Service Status</h4>
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                 <span className="text-xs font-bold">Twilio Gateway</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                 <span className="text-xs font-bold">AWS SES (SMTP)</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] opacity-50"></div>
                 <span className="text-xs font-bold text-slate-400 italic">WhatsApp API (Beta)</span>
              </div>
           </div>
        </Card>
      </div>
    </div>
  </div>
);

/** 
 * --- VIEW: ANALYTICS UTILIZATION --- 
 */

const AnalyticsUtilizationView = () => (
  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
    <SectionHeader 
       title="Utilization Intelligence" 
       description="Analyze service demand, department loads, and patient behavior patterns."
    />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Avg Wait Time', val: '14m', trend: '-2m', isUp: false },
        { label: 'Service Velocity', val: '92%', trend: '+4%', isUp: true },
        { label: 'Patient Retention', val: '78%', trend: 'Stable', isUp: true },
        { label: 'Card Activation', val: '45/day', trend: '+12', isUp: true },
      ].map((stat, i) => (
        <Card key={i}>
           <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <div className={cn("flex items-center text-[10px] font-bold", stat.trend.includes('-') || !stat.isUp ? "text-rose-600" : "text-emerald-600")}>
                 {stat.trend.includes('+') || stat.trend.includes('-') ? stat.trend : ''}
              </div>
           </div>
           <h3 className="text-2xl font-black text-slate-900">{stat.val}</h3>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-12 gap-8">
       <Card className="col-span-8">
          <h4 className="font-bold mb-8">Peak Usage Heatmap (Weekdays)</h4>
          <div className="flex items-end h-48 gap-4 px-4">
             {ANALYTICS_DATA.utilizationHeatmap.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-default">
                   <div className="w-full relative flex flex-col justify-end h-full">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${item.usage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="bg-rose-700/10 rounded-t-lg transition-colors group-hover:bg-rose-700/80 group-hover:shadow-[0_0_20px_rgba(175,16,26,0.3)] w-full"
                      />
                      <div className="absolute top-0 -translate-y-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded">
                        {item.usage}% Utilization
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.day}</span>
                </div>
             ))}
          </div>
       </Card>

       <Card className="col-span-4 bg-slate-50 border-dashed">
          <div className="space-y-6">
             <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Top Growing Services
                </h5>
                <div className="space-y-3">
                   {['Blood Panel', 'MRI Lumbar', 'General Consult'].map((s, i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-white border rounded-xl">
                        <span className="text-sm font-bold">{s}</span>
                        <span className="text-xs font-bold text-emerald-600">+{20-i*5}%</span>
                     </div>
                   ))}
                </div>
             </div>
             <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <TrendingDown className="w-4 h-4 text-rose-500" /> Declining Demand
                </h5>
                <div className="space-y-3">
                   {['Minor Surgery', 'Lobby Retail'].map((s, i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-white border rounded-xl">
                        <span className="text-sm font-bold text-slate-400 italic">{s}</span>
                        <span className="text-xs font-bold text-rose-600">-{15+i*8}%</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </Card>
    </div>
  </div>
);

const AccessLogs = () => (
  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
    <SectionHeader 
      title="Access & Audit Surveillance" 
      description="Real-time monitoring of sensitive database operations and identity authentication." 
    />

    <div className="bg-slate-50 border p-6 rounded-xl mb-8 grid grid-cols-4 gap-6">
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Search User ID</label>
        <input className="w-full p-2 border rounded bg-white text-sm" placeholder="Enter ID..." />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Action Type</label>
        <select className="w-full p-2 border rounded bg-white text-sm">
          <option>All Actions</option>
          <option>Login</option>
          <option>Data Edit</option>
        </select>
      </div>
      <div className="col-span-2 flex items-end gap-2">
         <button className="flex-1 bg-rose-700 text-white py-2 rounded font-bold text-sm">Apply Filter</button>
         <button className="flex-1 border-rose-700 border text-rose-700 py-2 rounded font-bold text-sm bg-white">Reset</button>
      </div>
    </div>

    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
       <table className="w-full text-left">
         <thead>
           <tr className="bg-slate-50 border-b text-[10px] uppercase font-bold text-slate-400">
             <th className="px-6 py-4">Timestamp</th>
             <th className="px-6 py-4">User ID</th>
             <th className="px-6 py-4">Action</th>
             <th className="px-6 py-4">IP Address</th>
             <th className="px-6 py-4">Status</th>
           </tr>
         </thead>
         <tbody className="divide-y font-mono text-xs">
           <tr className="hover:bg-rose-50/20">
             <td className="px-6 py-4">2023-10-31 14:22:05</td>
             <td className="px-6 py-4 text-rose-700 font-bold">DR-98212</td>
             <td className="px-6 py-4">Patient Record Access</td>
             <td className="px-6 py-4">192.168.1.144</td>
             <td className="px-6 py-4">
               <span className="px-2 py-1 rounded-full bg-green-50 text-emerald-700 uppercase font-black text-[10px]">Authorized</span>
             </td>
           </tr>
           <tr className="hover:bg-rose-50/20">
             <td className="px-6 py-4">2023-10-31 14:20:12</td>
             <td className="px-6 py-4 text-rose-700 font-bold">ADMIN-01</td>
             <td className="px-6 py-4">Billing Record Export</td>
             <td className="px-6 py-4">192.168.1.10</td>
             <td className="px-6 py-4">
               <span className="px-2 py-1 rounded-full bg-slate-50 text-slate-400 uppercase font-black text-[10px]">Flagged</span>
             </td>
           </tr>
         </tbody>
       </table>
    </div>
  </div>
);

const BillingCorrectionsView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionHeader 
       title="Billing Corrections" 
       description="Manage financial disputes, refunds, and ledger adjustments."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="col-span-2">
          <Card noPadding>
             <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                <h4 className="font-bold">Pending Adjustments</h4>
                <div className="flex gap-2">
                   <button className="flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
                      <History className="w-3.5 h-3.5" /> Adjustment Log
                   </button>
                </div>
             </div>
             <div className="divide-y">
                {[
                  { id: 'ADJ-441', pt: 'Arjun M.', original: '₹12,400', proposed: '₹11,000', reason: 'Service Discount' },
                  { id: 'ADJ-392', pt: 'Meera I.', original: '₹4,500', proposed: '₹0', reason: 'Failed Transaction' },
                ].map((adj) => (
                  <div key={adj.id} className="p-6 flex items-center justify-between hover:bg-slate-50">
                     <div className="flex gap-6 items-center">
                        <div className="text-center w-12 py-2 bg-slate-100 rounded-lg">
                           <p className="text-[10px] font-black text-slate-400 uppercase">Ref</p>
                           <p className="text-xs font-black">{adj.id.split('-')[1]}</p>
                        </div>
                        <div>
                           <h5 className="text-sm font-bold">{adj.pt}</h5>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Reason: {adj.reason}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="text-right">
                           <p className="text-[10px] text-slate-400 font-bold uppercase line-through">{adj.original}</p>
                           <p className="text-sm font-bold text-rose-700">{adj.proposed}</p>
                        </div>
                        <div className="flex gap-2">
                           <button className="p-2 border rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"><CheckCircle2 className="w-4 h-4" /></button>
                           <button className="p-2 border rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </Card>
       </div>
       <Card className="bg-rose-700 text-white border-rose-700">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-rose-200 mb-6 italic">Audits Required</h4>
          <div className="space-y-6">
             <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black opacity-60 uppercase mb-2">High Variance Detected</p>
                <div className="flex justify-between items-end">
                   <h5 className="text-2xl font-black italic">14 TXNs</h5>
                   <button className="text-[10px] font-black uppercase bg-white text-rose-700 px-3 py-1 rounded-full">Review Now</button>
                </div>
             </div>
             <p className="text-[10px] font-medium opacity-50 leading-relaxed italic">Discounts exceeding 15% of the total billing amount are automatically flagged for medical audit verification.</p>
          </div>
       </Card>
    </div>
  </div>
);

/** 
 * --- MAIN APP --- 
 */

export default function Admin1Portal() {
  const [view, setView] = useState<View>('analytics-overview');
  const [context, setContext] = useState<PortalContext>('admin');

  // View Lookup Table
  const renderView = () => {
    switch(view) {
      case 'analytics-overview': return <OverviewView />;
      case 'card-mgmt': return <CardMgmtView onSelectCard={() => {}} />;
      case 'security-governance': return <SecurityGovernanceView />;
      case 'billing-logs': return <BillingLogsView />;
      case 'comm-centre': return <CommCentreView />;
      case 'analytics-utilization': return <AnalyticsUtilizationView />;
      case 'access-audit': return <AccessLogs />;
      case 'billing-corrections': return <BillingCorrectionsView />;
      default: return (
        <div className="p-20 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
             <Activity className="w-12 h-12 text-slate-300 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 leading-none">Subsystem "{view}" is Off-Stream</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-4">Module scheduled for deployment in Sprint 4B</p>
          <button 
            onClick={() => setView('analytics-overview')} 
            className="mt-8 px-6 py-2 bg-rose-700 text-white rounded-full font-black uppercase text-xs tracking-widest shadow-xl shadow-rose-200 hover:scale-105 transition-transform"
          >
            Return to Core Feed
          </button>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-['Inter'] selection:bg-rose-100 selection:text-rose-900">
      {/* GLOBAL TRANSITION OVERLAY */}
      <motion.div 
        layout
        className="fixed inset-0 pointer-events-none z-[999] opacity-0"
      />

      <Sidebar view={view} setView={setView} context={context} />
      
      <main className="ml-64 min-h-screen flex flex-col relative">
        <Header viewName={view.split('-').join(' ')} />

        {/* CONTEXT SWITCHER TAB BAR */}
        <div className="px-8 py-3 border-b border-slate-100 flex justify-between items-center bg-white sticky top-16 z-30">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button 
              onClick={() => { setContext('admin'); setView('analytics-overview'); }}
              className={cn("px-6 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", context === 'admin' ? "bg-white text-rose-700 shadow-sm" : "text-slate-400 hover:text-slate-600")}
            >
              Operations Portal
            </button>
            <button 
              onClick={() => { setContext('compliance'); setView('security-governance'); }}
              className={cn("px-6 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", context === 'compliance' ? "bg-white text-rose-700 shadow-sm" : "text-slate-400 hover:text-slate-600")}
            >
              Governance Hub
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <History className="w-3.5 h-3.5 text-slate-300" />
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Last Audit: 12m ago</span>
            </div>
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="Active User" />
                </div>
              ))}
              <div className="w-6 h-6 rounded-full border-2 border-white bg-rose-700 text-white flex items-center justify-center text-[8px] font-black">+4</div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.99, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -5 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DECORATIVE BRUTALIST GRID */}
        <div className="fixed top-0 right-0 w-1/4 h-screen bg-slate-100/30 -z-10 pointer-events-none border-l border-slate-200/50 hidden xl:block radial-gradient"></div>
      </main>

      {/* QUICK COMMANDS / FAB */}
      <div className="fixed bottom-8 right-8 flex gap-4 z-50">
        <button className="h-12 px-6 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 shadow-2xl hover:-translate-y-1 active:scale-95 transition-all">
          <Zap className="w-4 h-4 text-rose-500 fill-rose-500" /> Alpha Search
        </button>
        <button className="w-12 h-12 bg-rose-700 text-white rounded-full flex items-center justify-center shadow-2xl shadow-rose-200 hover:rotate-90 transition-all border-4 border-white">
           <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
