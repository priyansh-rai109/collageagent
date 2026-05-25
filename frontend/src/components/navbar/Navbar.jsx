import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Sun, Cpu, ChevronDown, Check, Settings as SettingsIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Navbar() {
  const wsConnected = useStore((state) => state.wsConnected);
  const provider = useStore((state) => state.provider);
  const model = useStore((state) => state.model);
  const setProvider = useStore((state) => state.setProvider);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const providerLabelMap = {
    local: 'Local RAG OS',
    gemini: 'Google Gemini',
    groq: 'Groq Cloud'
  };

  const providerModelMap = {
    local: 'offline-rag-v1',
    gemini: 'gemini-3.5-flash',
    groq: 'llama3-70b'
  };

  const providerColorMap = {
    local: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    gemini: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    groq: 'border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.15)]'
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-purple-500/20 shadow-[0_1px_15px_rgba(139,92,246,0.1)] flex items-center justify-between px-6 z-20 shrink-0 relative">
      
      {/* Search Bar / command line input */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-80 hidden md:block group">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search neural command center..." 
            className="w-full bg-black/40 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:border-purple-500/50 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all placeholder:text-gray-600 text-white font-mono"
          />
        </div>
      </div>

      {/* Action Control Badges & User Status */}
      <div className="flex items-center gap-4">
        
        {/* Active AI Core Provider Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer select-none",
              providerColorMap[provider] || providerColorMap.local,
              "hover:border-purple-500/50 hover:bg-purple-500/5"
            )}
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>{providerLabelMap[provider]} ({providerModelMap[provider]})</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", dropdownOpen && "rotate-180")} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#12121a]/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-1.5 text-[9px] font-bold text-purple-400/50 uppercase tracking-widest border-b border-white/5 mb-1 font-mono">
                Select Neural Engine
              </div>
              {[
                { id: 'groq', name: 'Groq Cloud', model: 'llama3-70b' },
                { id: 'gemini', name: 'Google Gemini', model: 'gemini-3.5-flash' },
                { id: 'local', name: 'Local RAG OS', model: 'offline-rag-v1' }
              ].map((engine) => (
                <button
                  key={engine.id}
                  onClick={() => {
                    setProvider(engine.id);
                    setDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors cursor-pointer",
                    provider === engine.id 
                      ? "text-purple-400 bg-purple-500/10 font-bold" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{engine.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{engine.model}</span>
                  </div>
                  {provider === engine.id && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* WebSocket Signal Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-purple-500/10 backdrop-blur-sm shadow-inner">
          <div className="relative flex items-center justify-center w-3 h-3">
            {wsConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2 transition-colors duration-300",
              wsConnected ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"
            )}></span>
          </div>
          <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400/80">
            {wsConnected ? 'RAG LINK ONLINE' : 'RAG LINK OFFLINE'}
          </span>
        </div>

        {/* Right side system utility buttons */}
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all relative text-gray-400 hover:text-white cursor-pointer shadow-md">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse"></span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all text-gray-400 hover:text-white cursor-pointer shadow-md">
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 transition-all text-gray-400 hover:text-white cursor-pointer shadow-md">
            <SettingsIcon className="w-3.5 h-3.5" />
          </button>
          
          {/* User avatar on far right */}
          <div className="relative group cursor-pointer ml-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg ring-1 ring-white/20 select-none">
              <span className="text-[10px] font-bold tracking-widest font-mono">JD</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
