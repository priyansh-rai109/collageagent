import { useStore } from '../../store/useStore';
import { Activity, Cpu, Clock, Zap } from 'lucide-react';
import Card from '../ui/Card';

export default function AnalyticsPanel() {
  const wsConnected = useStore(state => state.wsConnected);
  const provider = useStore(state => state.provider);
  const model = useStore(state => state.model);
  const metrics = useStore(state => state.metrics);

  const providerLabelMap = {
    local: 'Local FastAPI RAG',
    gemini: 'Google Gemini',
    groq: 'Groq Cloud API'
  };

  const providerColorMap = {
    local: 'text-emerald-400',
    gemini: 'text-cyan-400',
    groq: 'text-purple-400'
  };

  const stats = [
    { 
      label: 'System RAG Status', 
      value: wsConnected ? 'Online' : 'Offline', 
      icon: Activity, 
      color: wsConnected ? 'text-emerald-400' : 'text-red-400',
      subtitle: wsConnected ? 'Uvicorn connected' : 'Link offline'
    },
    { 
      label: 'Active AI Provider', 
      value: providerLabelMap[provider] || 'Local OS', 
      icon: Cpu, 
      color: providerColorMap[provider] || 'text-primary',
      subtitle: `Model: ${model}`
    },
    { 
      label: 'Avg Response Latency', 
      value: `${metrics.averageResponseTime}s`, 
      icon: Clock, 
      color: 'text-secondary',
      subtitle: 'Based on rolling average'
    },
    { 
      label: 'Total Neural Queries', 
      value: metrics.totalQueries.toLocaleString(), 
      icon: Zap, 
      color: 'text-accent',
      subtitle: 'Cumulative stream count'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <Card key={idx} glowing>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              <p className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-gray-500 font-medium font-mono">{stat.subtitle}</p>
            </div>
            <div className={`p-2.5 rounded-xl bg-white/5 border border-white/5 shadow-inner ${stat.color}`}>
              <stat.icon className="w-5 h-5 animate-pulse-slow" />
            </div>
          </div>
          
          {idx === 0 && (
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {wsConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${wsConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">
                Local WebSocket Sync Active
              </span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
