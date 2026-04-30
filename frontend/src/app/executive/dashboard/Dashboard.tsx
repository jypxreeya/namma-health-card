import React from 'react';
import { 
  UserPlus, 
  BadgeCheck, 
  Calendar, 
  QrCode, 
  TrendingUp, 
  MapPin, 
  ClipboardCheck, 
  History, 
  CreditCard,
  ChevronRight,
  Share2,
  CalendarCheck,
  Stethoscope
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const barData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 60 },
  { name: 'Wed', value: 55 },
  { name: 'Thu', value: 75 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 85 },
  { name: 'Sun', value: 100 },
];

const pieData = [
  { name: 'Delivered', value: 154 },
  { name: 'Pending', value: 26 },
];
const COLORS = ['#b80035', '#f1f5f9'];

export default function Dashboard() {
  return (
    <div className="space-y-10 pb-20">
      {/* Quick Actions */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <h2 className="font-display text-xl font-bold text-slate-800">Quick Actions</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          <button className="flex-shrink-0 flex items-center gap-3 bg-primary text-white px-8 py-5 rounded-3xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] group">
            <UserPlus className="w-6 h-6" />
            <span className="font-display font-bold text-lg whitespace-nowrap">Register Patient</span>
          </button>
          {[
            { icon: BadgeCheck, label: 'Issue Card' },
            { icon: Calendar, label: 'New Visit' },
            { icon: QrCode, label: 'Scan QR Code' }
          ].map((action, i) => (
            <button key={i} className="flex-shrink-0 flex items-center gap-3 bg-white border border-slate-100 text-slate-700 px-8 py-5 rounded-3xl shadow-sm hover:border-primary/30 hover:bg-slate-50 transition-all active:scale-[0.98] group">
              <action.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-lg whitespace-nowrap">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Visits", value: "24", change: "+12%", color: "blue", icon: MapPin },
          { label: "New Registrations", value: "18", change: "+8%", color: "rose", icon: ClipboardCheck },
          { label: "Follow-ups", value: "06", change: "2 Pending", color: "amber", icon: History },
          { label: "Cards Issued", value: "42", change: "Active", color: "emerald", icon: CreditCard }
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="p-2.5 rounded-2xl bg-slate-50 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                kpi.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
              }`}>{kpi.change}</span>
            </div>
            <div className="font-display font-bold text-4xl text-slate-900 mb-1 tracking-tight">{kpi.value}</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Performance Widgets */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Delivery Performance */}
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <h3 className="font-display text-xl font-bold text-slate-800 mb-8">Card Delivery Rate</h3>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold text-2xl text-slate-900">85%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success</span>
              </div>
            </div>
            <div className="flex-1 w-full space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <span>Digitally Delivered</span>
                  <span className="text-slate-900 font-bold">154/180</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%] rounded-full shadow-sm"></div>
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm">
                Patient cards sent directly to mobile numbers via automated healthcare messages.
              </p>
            </div>
          </div>
        </div>

        {/* Growth Bar Chart */}
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-display text-xl font-bold text-slate-800">Visit Trends</h3>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
              <span className="uppercase">+4.2% Growth</span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <Bar 
                  dataKey="value" 
                  fill="#b80035" 
                  radius={[6, 6, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-widest text-center mt-6">Weekly patient visit volume</div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-xl font-bold text-slate-800">Recent Activity</h3>
            <button className="text-primary font-bold text-sm flex items-center gap-1 group">
              View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-8">
            {[
              { icon: UserPlus, title: 'Rahul K. registered successfully', time: 'Today, 10:45 AM • Clinic Branch A' },
              { icon: Share2, title: 'Card shared via WhatsApp with Anita S.', time: 'Today, 09:30 AM • System Gateway' },
              { icon: CalendarCheck, title: ' विक्रम M. visit status: Onboarding Complete', time: 'Yesterday, 05:15 PM • Cardiology' },
              { icon: CreditCard, title: 'Physical card issued to Sita Raman', time: 'Yesterday, 02:40 PM • Batch #220' }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg transition-colors group-hover:text-primary">{item.title}</p>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Card */}
        <div className="bg-primary p-10 rounded-[48px] shadow-xl text-white flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute -right-16 -top-16 w-60 h-60 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="bg-white/10 p-4 rounded-3xl border border-white/20">
                <Stethoscope className="w-8 h-8" />
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Registry</span>
            </div>
            <h4 className="font-display text-4xl font-bold mb-4 tracking-tight leading-tight">Monthly<br/>Branch Goal</h4>
            <p className="text-white/70 text-lg font-medium">
              Only <span className="text-white font-bold">12 new records</span> remaining to reach target.
            </p>
          </div>
          
          <div className="mt-10 space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="w-full bg-black/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '94%' }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className="bg-white h-full rounded-full shadow-sm"
                />
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/60">
                <span>188 Complete</span>
                <span className="text-white">Goal: 200</span>
              </div>
            </div>
            <button className="w-full bg-white text-primary font-display font-bold text-lg py-5 rounded-3xl shadow-lg active:scale-[0.98] transition-all hover:bg-slate-50 flex items-center justify-center gap-2">
              Claim Milestone
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
