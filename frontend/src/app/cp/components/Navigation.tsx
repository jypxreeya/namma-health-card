import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Users, User, History, MessageSquare, ShieldCheck, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function BottomNav() {
  const items = [
    { icon: Home, label: 'Home', path: '/cp/dashboard' },
    { icon: ClipboardList, label: 'Records', path: '/cp/records' },
    { icon: Users, label: 'Family', path: '/cp/family' },
    { icon: User, label: 'Profile', path: '/cp/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 shadow-[0_-1px_3px_0_rgba(0,0,0,0.05)] z-50 flex justify-around items-center h-20 pb-safe">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center px-5 py-1 transition-all duration-200",
              isActive ? "text-primary bg-rose-50 dark:bg-rose-950/30 rounded-2xl scale-95" : "text-zinc-500"
            )
          }
        >
          <item.icon className="w-6 h-6 mb-0.5" />
          <span className="text-[10px] font-bold font-display uppercase tracking-tight">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function TopBar({ title, showBack = false, onBack, rightElement }: { title: string; showBack?: boolean; onBack?: () => void; rightElement?: React.ReactNode }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 h-16 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={onBack} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full text-primary">
            <User className="w-6 h-6 rotate-180" /> {/* Mapping User to a back-ish icon for simplicity or sticking to Lucide back */}
          </button>
        )}
        <h1 className="text-lg font-bold font-display text-primary truncate">{title}</h1>
      </div>
      {rightElement}
    </header>
  );
}
