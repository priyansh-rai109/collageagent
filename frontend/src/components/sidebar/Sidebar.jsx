import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Building2, 
  Bus, 
  Info,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Academic AI', path: '/academic', icon: GraduationCap },
  { name: 'Department AI', path: '/department', icon: Building2 },
  { name: 'Transport AI', path: '/transport', icon: Bus },
  { name: 'College Info AI', path: '/college-info', icon: Info },
  { name: 'Analytics', path: '/analytics', icon: Activity },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen border-r border-purple-500/10 bg-black/60 backdrop-blur-2xl flex flex-col z-20 shrink-0 relative"
    >
      {/* Sidebar Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-20 -right-3.5 w-7 h-7 rounded-full bg-[#12121a] border border-purple-500/20 hover:border-purple-500/50 text-gray-400 hover:text-white flex items-center justify-center shadow-lg hover:shadow-purple-500/20 z-30 transition-all cursor-pointer"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/5 overflow-hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 flex items-center justify-center relative shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.6)]">
            <Zap className="w-4 h-4 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-lg bg-purple-500/20 animate-ping"></div>
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="font-black text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-200 to-cyan-300 font-mono"
            >
              JIET OS
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 scrollbar-hide">
        {!isCollapsed && (
          <div className="text-[10px] font-bold text-purple-400/50 uppercase tracking-widest mb-2 px-2 font-mono">
            NEURAL NETWORK CORE
          </div>
        )}
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative border",
              isActive 
                ? "bg-purple-500/10 text-white border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.25)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300 shrink-0",
                  isActive ? "text-purple-400 scale-110" : "group-hover:text-purple-400 group-hover:scale-110"
                )} />
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-semibold text-sm z-10 whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-30 pointer-events-none rounded-xl"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Upgrade/Pro Card */}
      {!isCollapsed && (
        <div className="p-4 mx-4 mb-4 rounded-xl border border-purple-500/30 bg-black/40 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono">Pro Plan</h4>
            </div>
            <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">Unlock unlimited neural queries & custom agents.</p>
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-[10px] font-black tracking-widest uppercase transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] hover:shadow-[0_0_18px_rgba(168,85,247,0.6)] cursor-pointer">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Footer Branding Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/5 flex items-center justify-center gap-2 shrink-0">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </span>
          <p className="text-[9px] text-purple-500/40 tracking-widest uppercase font-mono font-bold">
            NEURAL BINDING v2.0
          </p>
        </div>
      )}
    </motion.aside>
  );
}
