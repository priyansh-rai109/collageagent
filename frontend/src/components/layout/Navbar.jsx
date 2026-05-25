import { Bell, Search, Sun, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Navbar() {
  const wsConnected = useStore((state) => state.wsConnected);

  return (
    <header className="h-16 glass-panel border-b border-white/10 flex items-center justify-between px-6 z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96 hidden md:block group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search across all AI agents..." 
            className="w-full bg-black/20 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-black/40 transition-all placeholder:text-gray-600 text-white shadow-inner"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/5 backdrop-blur-sm">
          <div className="relative flex items-center justify-center w-3 h-3">
            {wsConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              wsConnected ? "bg-emerald-500" : "bg-red-500"
            )}></span>
          </div>
          <span className="text-xs font-medium text-gray-300">
            {wsConnected ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors relative text-gray-400 hover:text-white">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <Sun className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] ml-2">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
