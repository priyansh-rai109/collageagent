import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Building2, 
  Bus, 
  Info,
  Settings,
  Activity
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Academic AI', path: '/academic', icon: GraduationCap },
  { name: 'Department AI', path: '/department', icon: Building2 },
  { name: 'Transport AI', path: '/transport', icon: Bus },
  { name: 'College Info AI', path: '/college-info', icon: Info },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-white/10 glass-panel flex flex-col z-20 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-border">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            JIET OS
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
          AI Agents
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
              isActive 
                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                )}
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "text-primary scale-110" : "group-hover:text-primary group-hover:scale-110"
                )} />
                <span className="font-medium text-sm z-10">{item.name}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <button className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all w-full">
          <Activity className="w-5 h-5" />
          <span className="font-medium text-sm">System Analytics</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all w-full">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
}
