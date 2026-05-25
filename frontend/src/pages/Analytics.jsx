import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import AnalyticsPanel from '../components/analytics/AnalyticsPanel';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Trash2, Cpu, BrainCircuit, MessageSquare, Terminal } from 'lucide-react';

export default function Analytics() {
  const chats = useStore(state => state.chats);
  const clearHistory = useStore(state => state.clearHistory);
  const provider = useStore(state => state.provider);
  const model = useStore(state => state.model);
  const wsConnected = useStore(state => state.wsConnected);
  const telemetryLogs = useStore(state => state.telemetryLogs || []);
  
  const logsEndRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [telemetryLogs]);

  const agentsTelemetry = [
    { id: 'academic', name: 'Academic AI Agent', icon: BrainCircuit, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5' },
    { id: 'department', name: 'Department Information Agent', icon: Cpu, color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
    { id: 'transport', name: 'Transport Management Agent', icon: ShieldAlert, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
    { id: 'collegeInfo', name: 'College Information Agent', icon: MessageSquare, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 relative scrollbar-hide">
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Operation Telemetry</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">System Operations Console</h1>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl">
            Live diagnostic feed monitoring isolated neural links, network socket packets, and LLM providers.
          </p>
        </motion.div>

        {/* Dynamic Analytics Summary Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnalyticsPanel />
        </motion.div>

        {/* Detailed Agent Stats & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Diagnostic Stats for the 4 Agents */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase font-mono px-1">Agent Neural Feeds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agentsTelemetry.map((agent) => {
                const history = chats[agent.id] || [];
                const messagesCount = history.length;
                
                return (
                  <Card key={agent.id} title={agent.name} Icon={agent.icon} glowing>
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-500">History Load:</span>
                        <span className="font-semibold text-white">{messagesCount} messages</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-500">Active Pipeline:</span>
                        <span className={`font-semibold capitalize ${wsConnected || provider !== 'local' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {provider === 'local' ? 'FastAPI socket' : `${provider} stream`}
                        </span>
                      </div>

                      {messagesCount > 0 ? (
                        <button
                          onClick={() => {
                            clearHistory(agent.id);
                          }}
                          className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Flush Neural Link</span>
                        </button>
                      ) : (
                        <div className="w-full mt-4 py-2 text-center text-[10px] font-semibold tracking-widest uppercase text-gray-600 border border-white/5 bg-white/5 rounded-xl font-mono">
                          Link Awaiting Activation
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* System Console Emulator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold tracking-widest text-gray-400 uppercase font-mono px-1">Telemetry Shell</h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="relative flex-1 bg-black/60 border border-white/10 rounded-2xl p-6 font-mono text-[11px] leading-relaxed text-emerald-400/90 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[300px] flex flex-col">
              <div className="absolute top-2 right-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center gap-1 select-none">
                <Terminal className="w-3.5 h-3.5" />
                <span>sh-node</span>
              </div>
              <div className="space-y-2 overflow-y-auto flex-1 scrollbar-hide pr-1">
                {telemetryLogs.map((log, index) => {
                  let colorClass = 'text-gray-400 font-mono';
                  if (log.includes('🟢')) colorClass = 'text-emerald-400 font-mono font-bold';
                  if (log.includes('🔴')) colorClass = 'text-red-400 font-mono font-bold';
                  if (log.includes('⚙️') || log.includes('📂') || log.includes('🖥️')) colorClass = 'text-gray-500 font-mono';
                  return (
                    <p key={index} className={`text-[10px] break-all leading-normal ${colorClass}`}>
                      {log}
                    </p>
                  );
                })}
                <div ref={logsEndRef} />
                <p className="text-purple-400 mt-4 animate-pulse font-mono text-[10px]">&gt;_ System diagnostics online. Listening for incoming neural inputs...</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
