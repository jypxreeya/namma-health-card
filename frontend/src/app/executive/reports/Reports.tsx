import React from 'react';
import { 
  Download, 
  FileText, 
  Calendar, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  Timer, 
  Share2, 
  Search, 
  Filter, 
  Info,
  Map as MapIcon,
  Zap,
  ArrowUpRight,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { ReportTab } from '@/lib/types';
import { REGISTRATION_EVENTS } from '@/lib/constants';

interface ReportsPageProps {
  activeTab: ReportTab;
}

export default function ReportsPage({ activeTab }: ReportsPageProps) {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-10 mb-20">
      {renderReportTab(activeTab)}
    </div>
  );
}

function renderReportTab(tab: ReportTab) {
  switch (tab) {
    case 'Summary': return <ReportSummary />;
    case 'Daily': return <ReportDaily />;
    case 'Performance': return <ReportPerformance />;
    case 'Exports': return <div className="text-center py-20 text-slate-400 font-display font-bold">Export Module Loading...</div>;
    default: return <ReportDaily />;
  }
}

// --- SUB-PAGES ---

function ReportSummary() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-display-lg text-on-surface mb-1">KPIs & Metrics</h2>
          <p className="text-secondary-container-text font-sans text-slate-500 max-w-xl">Real-time performance analysis for regional registration operations and card issuance efficiency.</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 border border-slate-200 text-primary font-display font-bold text-sm rounded-xl flex items-center gap-2 hover:bg-rose-50 transition-colors">
            <Calendar className="w-5 h-5" />
            Last 30 Days
          </button>
          <button className="h-12 px-6 bg-primary text-white font-display font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20">
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard icon={<TrendingUp />} title="Conversion Rate %" value="68.2%" trend="+12.4%" color="text-emerald-600 bg-emerald-50" />
        <KpiCard icon={<Timer />} title="Avg Time to Register" value="4.5 min" trend="-2.1m" color="text-error bg-error-container/40" />
        <KpiCard icon={<CreditCard />} title="Card Issuance Success" value="94.8%" trend="99.9%" color="text-tertiary bg-tertiary-fixed" />
        <KpiCard icon={<Share2 />} title="WhatsApp Share" value="1.2k" trend="+42%" color="text-tertiary bg-tertiary-fixed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Funnel */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-display text-title-lg text-on-surface">Conversion Funnel</h3>
            <Filter className="w-5 h-5 text-slate-300" />
          </div>
          <div className="p-8 space-y-6">
            <FunnelStep label="Leads" value="12,450" percentage={100} color="bg-primary" />
            <div className="flex justify-center -my-3"><span className="text-[10px] font-black text-primary/40 uppercase tracking-widest bg-white px-3 z-10">84% Retention</span></div>
            <FunnelStep label="Visits" value="10,458" percentage={84} color="bg-primary/80" />
            <div className="flex justify-center -my-3"><span className="text-[10px] font-black text-primary/40 uppercase tracking-widest bg-white px-3 z-10">78% Retention</span></div>
            <FunnelStep label="Registered" value="8,150" percentage={65} color="bg-primary/60" />
            <div className="flex justify-center -my-3"><span className="text-[10px] font-black text-primary/40 uppercase tracking-widest bg-white px-3 z-10">95% Retention</span></div>
            <FunnelStep label="Card Issued" value="7,742" percentage={62} color="bg-primary/40" />
          </div>
          <div className="p-8 bg-slate-50 border-t border-slate-100 grid grid-cols-3 gap-4">
            <FunnelStat label="Total Conv." value="62.1%" />
            <FunnelStat label="Abandonment" value="37.9%" />
            <FunnelStat label="Growth MoM" value="+8.4%" />
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col h-full shadow-2xl">
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="w-6 h-6 text-primary fill-primary" />
              <h3 className="font-display text-title-lg font-bold">AI Insights</h3>
            </div>
            <div className="space-y-8 flex-1">
              <InsightItem 
                icon={<TrendingUp className="text-primary" />} 
                text={<span>Conversion between <b className="text-primary">Visits</b> and <b className="text-primary">Registered</b> is up by 15% following the UI update.</span>} 
              />
              <InsightItem 
                icon={<AlertCircle className="text-amber-400" />} 
                text={<span>Card issuance latency in <b className="text-white">Zone B</b> is 2m above average. Recommend checking printer hardware.</span>} 
              />
              <InsightItem 
                icon={<Info className="text-tertiary-fixed" />} 
                text={<span>Incentivizing <b className="text-white">WhatsApp Shares</b> could potentially increase volume by 22% based on current trends.</span>} 
              />
            </div>
            <button className="mt-10 w-full py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl font-display font-bold text-sm text-white border border-white/10">
              Refresh Insights
            </button>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}

function ReportDaily() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-display-lg text-on-surface mb-1">Daily Registration Report</h2>
          <p className="text-slate-500 font-sans text-sm">Comprehensive tracking of patient onboarding and validation metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-12 px-6 flex items-center gap-2 border border-primary text-primary font-display font-bold text-sm rounded-xl hover:bg-rose-50 transition-colors">
            <FileText className="w-5 h-5" />
            Export PDF
          </button>
          <button className="h-12 px-6 flex items-center gap-2 bg-primary text-white font-display font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Download className="w-5 h-5" />
            Export Excel
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reporting Period */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200">
            <h3 className="font-display text-title-lg mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              Select Period
            </h3>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Date Range</label>
                <div className="h-14 px-5 flex items-center justify-between border border-slate-200 rounded-2xl cursor-pointer hover:border-primary/40 transition-colors group">
                  <span className="font-sans text-sm font-medium text-on-surface">Oct 01, 2023 - Oct 31, 2023</span>
                  <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </div>
              <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-[10px] font-black text-slate-300">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {[28,29,30,1,2,3,4].map((d, i) => (
                    <button key={i} className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-bold ${
                      d === 1 ? 'bg-primary text-white shadow-md' : i < 3 ? 'text-slate-200' : 'text-primary bg-primary/5 hover:bg-primary/10'
                    }`}>{d}</button>
                  ))}
                  <div className="col-span-7 py-2"><div className="h-px bg-slate-100 w-full"></div></div>
                  {[28,29,30,31].map((d, i) => (
                    <button key={i} className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-bold ${
                      d === 31 ? 'bg-primary text-white shadow-md' : 'text-primary bg-primary/5 hover:bg-primary/10'
                    }`}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Period KPI */}
          <div className="bg-primary text-white p-8 rounded-3xl shadow-xl overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-white/70 font-display font-bold text-sm mb-1.5">Period Registrations</h3>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black font-display tracking-tighter">1,284</span>
                <span className="text-rose-200 text-sm font-bold">+12.5% vs LW</span>
              </div>
            </div>
            <Users className="absolute -right-4 -bottom-6 w-32 h-32 opacity-10 blur-[1px] group-hover:rotate-12 transition-transform duration-700" />
          </div>
        </div>

        {/* Volume Chart */}
        <div className="lg:col-span-8">
          <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200 h-full flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="font-display text-title-lg font-bold">Registration Volume</h3>
                <p className="text-slate-500 text-sm font-sans">Daily onboardings over last 30 operational days</p>
              </div>
              <div className="flex gap-3">
                <ChartLegend color="bg-primary" label="In-Patient" />
                <ChartLegend color="bg-slate-200" label="Out-Patient" />
              </div>
            </div>
            
            <div className="flex-1 flex items-end justify-between gap-2 px-1">
              {[40, 55, 70, 65, 80, 95, 60, 45, 50, 30, 40, 55, 70, 65, 80, 85, 60, 45, 50, 30].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${i === 5 || i === 15 ? 'bg-primary' : 'bg-slate-100 hover:bg-primary/30'}`} 
                    style={{ height: `${h * 2.5}px` }}
                  ></div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 shadow-inner-white">
              <span>Oct 01</span>
              <span>Oct 15</span>
              <span>Oct 31</span>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="col-span-12">
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="font-display text-title-lg font-bold">Recent Registration Events</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input className="h-12 pl-12 pr-6 text-sm border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none min-w-[280px]" placeholder="Search patients..." type="text" />
                </div>
                <button className="h-12 w-12 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-5 font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Patient Identity</th>
                    <th className="px-8 py-5 font-display font-bold text-xs text-slate-400 uppercase tracking-widest">ID / MRN</th>
                    <th className="px-8 py-5 font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Time</th>
                    <th className="px-8 py-5 font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Facility</th>
                    <th className="px-8 py-5 font-display font-bold text-xs text-slate-400 uppercase tracking-widest text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {REGISTRATION_EVENTS.map((event) => (
                    <tr key={event.id} className="hover:bg-primary/[0.02] transition-colors cursor-pointer group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">{event.initials}</div>
                          <div className="font-display font-bold text-sm text-on-surface">{event.patientName}</div>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-sans text-sm text-slate-500">{event.mrn}</td>
                      <td className="px-8 py-5 font-sans text-sm text-slate-500">{event.time}</td>
                      <td className="px-8 py-5 font-sans text-sm text-slate-500">{event.facility}</td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          event.status === 'Validated' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          event.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-primary/5 text-primary border-primary/10'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportPerformance() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-display-lg text-on-surface mb-1">Area Performance</h2>
          <p className="text-secondary font-sans text-slate-500">Real-time geographic density and registration efficiency metrics.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative min-w-[200px]">
            <select className="w-full h-12 pl-5 pr-12 appearance-none bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary font-display outline-none">
              <option>All Regions</option>
              <option>North Metropolitan</option>
              <option>South Central</option>
              <option>Eastern Valley</option>
              <option>West Coastal</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-5 h-5" />
          </div>
          <button className="h-12 px-6 bg-primary text-white font-display font-bold text-sm rounded-xl flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20">
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8 h-full">
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col h-[600px]">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-display text-title-lg font-bold">Registration Density Map</h3>
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
              <button className="px-6 py-2 bg-white shadow-sm rounded-lg text-xs font-black uppercase tracking-widest text-primary">Heatmap</button>
              <button className="px-6 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Cluster</button>
            </div>
          </div>
          <div className="relative flex-grow bg-slate-100">
            <img 
              alt="Regional Heatmap" 
              className="w-full h-full object-cover grayscale opacity-30" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMzSQxEENqkmKq9QVTtLr44PgW3Wy04toJ4jy44DGsvPAK3NyRcH_iHHTOBEcJtf7KLe2Im05jnGqWqNtxI8LjxnbPBmVRA4QTWRB4xG7ukzIb_eXeDCZ5NrRVoIyZ7nr1pnmj4rnxKkNVLKxZgdhJ4C82s4QrQmbfDxYejzoaqW-x7g4iujkhcZcea56kxJxODe0XLT0_nL9Abu4O76NeS8XCiXk7SGF_3F9ERCo90kh2XtusyhJXjQ82s2mG7Aixj-fe-HckqC3O" 
            />
            {/* Heatmap overlay dots */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[30%] left-[40%] w-32 h-32 bg-primary/30 rounded-full blur-[40px]"></div>
              <div className="absolute top-[50%] left-[20%] w-24 h-24 bg-primary/20 rounded-full blur-[30px]"></div>
              <div className="absolute top-[60%] left-[70%] w-40 h-40 bg-primary/40 rounded-full blur-[50px]"></div>
            </div>
            
            <div className="absolute bottom-8 right-8 flex flex-col gap-3">
              <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all font-black text-2xl">+</button>
              <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-600 hover:text-primary hover:scale-110 transition-all font-black text-2xl">-</button>
            </div>
            <div className="absolute top-8 left-8 p-6 glass-card border border-white/50 rounded-3xl shadow-2xl w-56">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-[0.2em]">Density Scale</p>
              <div className="h-2 w-full bg-gradient-to-r from-rose-100 via-rose-400 to-primary rounded-full mb-3"></div>
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span>Low</span>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-8 flex-1">
            <h3 className="font-display text-title-lg font-bold text-on-surface mb-8">Top Performing Areas</h3>
            <div className="space-y-6">
              <AreaPerformanceItem index="01" name="Downtown Core" trend="+12.4%" percentage={92} target="920 / 1,000" active />
              <AreaPerformanceItem index="02" name="North Hills" trend="+8.1%" percentage={78} target="785 / 1,000" />
              <AreaPerformanceItem index="03" name="East Industrial" trend="-2.4%" percentage={64} target="642 / 1,000" negative />
            </div>
            <button className="w-full mt-10 py-4 text-primary font-display font-bold text-sm border-2 border-primary/10 rounded-2xl hover:bg-primary/5 transition-all">
              View Full Ranking
            </button>
          </div>

          <div className="bg-primary text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-white/70 font-display font-bold text-sm mb-1.5 uppercase tracking-wider">Global Target Progress</p>
                <h4 className="font-display text-4xl font-black leading-tight mb-2">12,480 <span className="text-white/40 text-xl">/ 15,000</span></h4>
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">On Track</span>
                  <span className="text-white/70 text-xs font-medium">83% of Monthly Goal</span>
                </div>
              </div>
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div className="bg-white h-full transition-all duration-1000 ease-out" style={{ width: '83%' }}></div>
              </div>
            </div>
            <ArrowUpRight className="absolute -right-6 -top-6 w-32 h-32 opacity-10" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-8 group hover:border-primary/20 transition-colors">
          <div className="w-20 h-20 rounded-3xl bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform duration-500">
            <Timer className="w-10 h-10" />
          </div>
          <div>
            <p className="text-slate-500 font-display font-bold text-sm mb-1">Avg. Reg Velocity</p>
            <h4 className="font-display text-3xl font-black text-on-surface">4.2 <span className="text-slate-400 text-lg font-bold">per hour</span></h4>
            <p className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              18% vs Last Week
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-8 group hover:border-error/20 transition-colors">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-500">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div>
            <p className="text-slate-500 font-display font-bold text-sm mb-1">Underperforming</p>
            <h4 className="font-display text-3xl font-black text-on-surface">03 <span className="text-slate-400 text-lg font-bold">Areas</span></h4>
            <p className="text-error font-black text-[10px] uppercase tracking-widest mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Action Required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SHARED COMPONENTS ---

function KpiCard({ icon, title, value, trend, color }: { icon: React.ReactNode, title: string, value: string, trend: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
        </div>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${color}`}>{trend}</span>
      </div>
      <div className="text-slate-500 font-display font-bold text-xs uppercase tracking-widest mb-1.5">{title}</div>
      <div className="font-display text-4xl font-black text-on-surface tracking-tighter">{value}</div>
    </div>
  );
}

function FunnelStep({ label, value, percentage, color }: { label: string, value: string, percentage: number, color: string }) {
  return (
    <div className="relative group">
      <div 
        className={`h-16 rounded-2xl flex items-center px-8 text-white justify-between relative z-10 transition-all duration-700 ease-out shadow-sm ${color}`}
        style={{ width: `${percentage}%`, margin: '0 auto' }}
      >
        <span className="font-display font-bold text-sm">{label}</span>
        <span className="font-display font-black text-xl tracking-tighter">{value}</span>
      </div>
    </div>
  );
}

function FunnelStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center group">
      <div className="text-slate-400 font-display font-bold text-[10px] uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{label}</div>
      <div className="font-display font-black text-xl text-on-surface tracking-tight">{value}</div>
    </div>
  );
}

function InsightItem({ icon, text }: { icon: React.ReactNode, text: React.ReactNode }) {
  return (
    <div className="flex gap-5 group">
      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-white/10 transition-all">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      </div>
      <p className="text-slate-400 text-sm leading-relaxed font-sans">{text}</p>
    </div>
  );
}

function ChartLegend({ color, label }: { color: string, label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1.5 rounded-full bg-slate-50">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      {label}
    </span>
  );
}

function AreaPerformanceItem({ index, name, trend, percentage, target, active, negative }: { index: string, name: string, trend: string, percentage: number, target: string, active?: boolean, negative?: boolean }) {
  return (
    <div className={`p-6 rounded-3xl border transition-all ${active ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-white border-transparent hover:border-slate-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center ${active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>{index}</span>
          <p className="font-display font-bold text-on-surface">{name}</p>
        </div>
        <span className={`font-black text-xs uppercase tracking-widest flex items-center gap-1 ${negative ? 'text-error' : 'text-emerald-600'}`}>
          {negative ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
          {trend}
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-[0.15em]">
        <p className="text-slate-400 italic">{target} Target</p>
        <p className="text-on-surface">{percentage}%</p>
      </div>
    </div>
  );
}
