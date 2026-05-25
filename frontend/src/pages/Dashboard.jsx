import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { wsService } from '../services/websocket';
import { 
  BrainCircuit, 
  Server, 
  Shield, 
  Database, 
  Activity, 
  Cpu, 
  Clock, 
  Zap, 
  ArrowRight,
  MessageSquare,
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import robotImg from '../assets/robot.jpg';

export default function Dashboard() {
  const wsConnected = useStore((state) => state.wsConnected);
  const provider = useStore((state) => state.provider);
  const model = useStore((state) => state.model);
  const metrics = useStore((state) => state.metrics);
  const chats = useStore((state) => state.chats);

  useEffect(() => {
    wsService.connect();
  }, []);

  const providerLabelMap = {
    local: 'Local FastAPI RAG',
    gemini: 'Google Gemini',
    groq: 'Groq Cloud API'
  };

  const providerModelMap = {
    local: 'offline-rag-v1',
    gemini: 'gemini-3.5-flash',
    groq: 'llama3-70b'
  };

  // Compile recent user queries from store or fall back to realistic defaults
  const getRecentQueries = () => {
    const list = [];
    const agentNames = {
      academic: 'Academic AI',
      department: 'Department AI',
      transport: 'Transport AI',
      collegeInfo: 'College Info AI'
    };

    Object.entries(chats).forEach(([agentId, messages]) => {
      messages.forEach((msg) => {
        if (msg.role === 'user') {
          list.push({
            agentId,
            agentName: agentNames[agentId] || 'AI Agent',
            content: msg.content,
            timestamp: new Date(msg.timestamp)
          });
        }
      });
    });

    // Sort by timestamp descending
    list.sort((a, b) => b.timestamp - a.timestamp);

    if (list.length > 0) {
      return list.slice(0, 4).map((q) => ({
        agentName: q.agentName,
        query: q.content,
        time: formatRelativeTime(q.timestamp)
      }));
    }

    // Default cyberpunk dummy logs for high-end aesthetic
    return [
      { agentName: 'Academic AI', query: 'What is the credit weightage for Artificial Intelligence core subject?', time: '2 mins ago' },
      { agentName: 'Department AI', query: 'List out active research grants in Computer Science department.', time: '12 mins ago' },
      { agentName: 'Transport AI', query: 'Show route 4 college bus pickup times and driver contact.', time: '1 hour ago' },
      { agentName: 'College Info AI', query: 'When are the registration dates for upcoming hackathon?', time: '3 hours ago' }
    ];
  };

  const formatRelativeTime = (date) => {
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return date.toLocaleDateString();
  };

  const stats = [
    { 
      label: 'SYSTEM STATUS', 
      value: wsConnected ? 'Online' : 'Offline', 
      icon: Activity, 
      color: wsConnected ? 'text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
      subtitle: wsConnected ? 'Uvicorn connected' : 'Link offline',
      pulse: wsConnected
    },
    { 
      label: 'ACTIVE AI PROVIDER', 
      value: providerLabelMap[provider] || 'Local OS', 
      icon: Cpu, 
      color: 'text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]',
      subtitle: `Model: ${providerModelMap[provider] || model}`,
      pulse: false
    },
    { 
      label: 'AVG RESPONSE LATENCY', 
      value: `${metrics.averageResponseTime || 1.46}s`, 
      icon: Clock, 
      color: 'text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
      subtitle: 'Based on rolling average',
      pulse: false
    },
    { 
      label: 'TOTAL NEURAL QUERIES', 
      value: metrics.totalQueries || 21, 
      icon: Zap, 
      color: 'text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
      subtitle: 'Cumulative stream count',
      pulse: true
    },
  ];

  const agents = [
    { 
      name: 'Academic AI', 
      path: '/academic', 
      desc: 'Curriculum databases, exams, grading schemes, and dynamic academic timetables.', 
      icon: BrainCircuit, 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      borderColor: 'group-hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
    },
    { 
      name: 'Department AI', 
      path: '/department', 
      desc: 'Information regarding department faculty details, laboratories, ongoing research, and events.', 
      icon: Server, 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
      borderColor: 'group-hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
    },
    { 
      name: 'Transport AI', 
      path: '/transport', 
      desc: 'College bus routing charts, real-time schedule information, and pass application processes.', 
      icon: Shield, 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      borderColor: 'group-hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
    },
    { 
      name: 'College Info AI', 
      path: '/college-info', 
      desc: 'General admissions, hostel facilities, infrastructure guide, and central administration office FAQs.', 
      icon: Database, 
      glowColor: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      borderColor: 'group-hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 relative scrollbar-hide">
      
      {/* Cyberpunk HUD Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f15_1px,transparent_1px),linear-gradient(to_bottom,#0f0f15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20 z-0"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* HERO SECTION WITH AI AVATAR */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#12121a]/90 via-[#181824]/50 to-[#0a0a0f]/40 border border-purple-500/15 p-8 rounded-3xl relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
          {/* Animated corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase font-mono">NEURAL CONNECTION LINKED</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-300">JIET OS</span> 👋
            </h1>
            <p className="text-gray-400 text-sm lg:text-base max-w-xl leading-relaxed">
              Your centralized artificial intelligence command center. Select an autonomous agent below to initiate an isolated secure neural link.
            </p>
          </motion.div>

          {/* Holographic 3D Avatar Area */}
          <div className="relative flex items-center justify-center w-64 h-56 select-none shrink-0">
            {/* Tilted Holographic Rings below robot */}
            <div className="absolute w-44 h-10 rounded-full border border-purple-500/30 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.25)] -bottom-2 transform rotate-x-60 animate-[spin_12s_linear_infinite]"></div>
            <div className="absolute w-36 h-8 rounded-full border border-cyan-500/40 bg-transparent -bottom-1.5 transform rotate-x-60 animate-[pulse_3s_infinite_linear]" style={{ animationDelay: '1s' }}></div>

            {/* Main Avatar Head */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative w-36 h-36 flex items-center justify-center z-10"
            >
              {/* Outer rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-purple-500/50 scale-105"
              ></motion.div>
              
              {/* Inner glow base */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-600/35 via-violet-600/20 to-cyan-500/35 filter blur-xl animate-pulse"></div>
              
              {/* Core Robot Image Wrapper */}
              <div className="relative w-28 h-28 rounded-full border-2 border-purple-500/40 shadow-[0_0_25px_rgba(139,92,246,0.45)] overflow-hidden">
                <img 
                  src={robotImg} 
                  alt="JIET AI Operating System Neural Assistant" 
                  className="w-full h-full object-cover scale-105"
                />
                
                {/* HUD Scanner Line */}
                <motion.div 
                  animate={{ y: [-10, 120, -10] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Glowing chat bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-purple-900/90 to-[#12121a]/95 border border-purple-500/35 rounded-2xl rounded-bl-none shadow-[0_0_15px_rgba(168,85,247,0.35)] max-w-[150px] backdrop-blur-md z-20"
            >
              <p className="text-[10px] text-purple-200 font-bold tracking-wide leading-snug">
                How can I assist you today?
              </p>
            </motion.div>
          </div>
        </div>

        {/* SYSTEM STATS CARDS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="relative group overflow-hidden rounded-2xl border border-white/5 bg-[#12121a]/40 backdrop-blur-md p-5 flex items-start justify-between hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-2xl blur-lg group-hover:opacity-50 opacity-0 transition-opacity"></div>
              
              <div className="space-y-1 relative">
                <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest font-mono">{stat.label}</p>
                <p className="text-2xl font-black tracking-tight text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-400 font-medium font-mono leading-relaxed">{stat.subtitle}</p>
              </div>

              <div className={`p-2.5 rounded-xl border relative shrink-0 ${stat.color}`}>
                <stat.icon className={`w-4 h-4 ${stat.pulse ? 'animate-pulse' : ''}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* AI AGENTS GRID SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black tracking-widest text-purple-400 uppercase font-mono">SECURE AGENT SELECTION</h2>
            <div className="h-[1px] bg-purple-500/10 flex-1 mx-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, idx) => (
              <Link key={idx} to={agent.path} className="group">
                <div className={`h-full border border-white/5 bg-[#12121a]/50 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group ${agent.glowColor} ${agent.borderColor} relative overflow-hidden shadow-lg`}>
                  {/* Neon active corner decor */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-purple-500/50 transition-colors"></div>
                  
                  <div>
                    {/* Glowing Avatar Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-6 transition-all duration-300 ${agent.iconBg}`}>
                      <agent.icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors">{agent.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-normal mb-6">{agent.desc}</p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-purple-400/80 group-hover:text-purple-300 transition-all font-mono">
                    <span>LAUNCH LINK</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* LOWER SECTION: SYSTEM ACTIVITY & RECENT QUERIES */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* SYSTEM ACTIVITY OSCILLOSCOPE */}
          <div className="lg:col-span-3 border border-white/5 bg-[#12121a]/40 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between min-h-[220px] relative overflow-hidden group hover:border-purple-500/20 transition-all">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-purple-500/20"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-500/20"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
                <h3 className="text-sm font-black text-white tracking-widest uppercase font-mono">SYSTEM ACTIVITY MONITOR</h3>
              </div>
              <div className="text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-md">
                100 Hz / FEED SYNC
              </div>
            </div>

            {/* Neural Brainwave Oscillosope SVG Waveform */}
            <div className="flex-1 flex items-center justify-center relative w-full h-32 my-2 bg-black/30 rounded-xl border border-white/5 overflow-hidden">
              <svg className="w-full h-full text-purple-500" viewBox="0 0 400 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Overlay inside oscilloscope */}
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                {/* Animated Path 1 */}
                <motion.path
                  d="M0,50 Q50,20 100,50 T200,50 T300,50 T400,50"
                  initial={{ d: "M0,50 Q50,20 100,50 T200,50 T300,50 T400,50" }}
                  fill="none"
                  stroke="url(#wave-grad-1)"
                  strokeWidth="2.5"
                  animate={{
                    d: [
                      "M0,50 Q50,15 100,50 T200,50 T300,10 T400,50",
                      "M0,50 Q50,85 100,50 T200,50 T300,85 T400,50",
                      "M0,50 Q50,15 100,50 T200,50 T300,10 T400,50"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
                
                {/* Animated Path 2 */}
                <motion.path
                  d="M0,50 Q50,80 100,20 T200,80 T300,50 T400,50"
                  initial={{ d: "M0,50 Q50,80 100,20 T200,80 T300,50 T400,50" }}
                  fill="none"
                  stroke="url(#wave-grad-2)"
                  strokeWidth="1.5"
                  opacity="0.6"
                  animate={{
                    d: [
                      "M0,50 Q50,80 100,20 T200,80 T300,50 T400,50",
                      "M0,50 Q50,30 100,80 T200,25 T300,75 T400,50",
                      "M0,50 Q50,80 100,20 T200,80 T300,50 T400,50"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                />
              </svg>

              {/* Glowing horizontal line */}
              <div className="absolute w-full h-[1px] bg-purple-500/10 pointer-events-none"></div>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono">
              <span>FREQUENCY: 98.4%</span>
              <span>SYNAPTIC BANDWIDTH: 4.8 Gb/s</span>
              <span>CORE TEMPERATURE: 42°C</span>
            </div>
          </div>

          {/* RECENT NEURAL QUERIES */}
          <div className="lg:col-span-2 border border-white/5 bg-[#12121a]/40 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between hover:border-purple-500/20 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-black text-white tracking-widest uppercase font-mono">RECENT NEURAL QUERIES</h3>
              </div>

              <div className="space-y-3">
                {getRecentQueries().map((q, idx) => (
                  <div key={idx} className="p-3 bg-black/30 rounded-xl border border-white/5 flex items-start gap-3 hover:bg-black/40 transition-colors">
                    {/* Glowing status dots */}
                    <div className="relative flex items-center justify-center w-2 h-2 mt-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500 shadow-[0_0_8px_#8b5cf6]"></span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-cyan-400 font-mono">{q.agentName}</span>
                        <span className="text-[9px] text-gray-500 font-mono">{q.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 truncate font-mono">{q.query}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 text-center">
              <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">
                SYSTEM TELEMETRY LINK ENGAGED
              </span>
            </div>
          </div>

        </div>

        {/* FLOATING MINI ROBOT ASSISTANT (BOTTOM RIGHT) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end group">
          {/* Chat bubble that appears on hover/visible by default */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-2 px-3 py-1.5 bg-[#12121a]/95 border border-purple-500/35 rounded-xl rounded-br-none shadow-[0_0_15px_rgba(168,85,247,0.35)] text-[10px] font-bold text-purple-200 font-mono select-none backdrop-blur-md"
          >
            I'm here to help!
          </motion.div>

          {/* Cute Robot Body */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative cursor-pointer flex flex-col items-center group-hover:scale-105 transition-transform"
          >
            {/* Holographic Ring under the mini robot */}
            <div className="w-12 h-3 rounded-full border border-purple-500/30 bg-purple-500/5 shadow-[0_0_10px_rgba(168,85,247,0.3)] absolute -bottom-1.5 transform rotate-x-60 animate-[spin_10s_linear_infinite]"></div>

            {/* Robot Head */}
            <div className="relative w-12 h-12 rounded-full border border-purple-500/35 shadow-[0_0_15px_rgba(168,85,247,0.25)] overflow-hidden transition-all group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <img 
                src={robotImg} 
                alt="Mini AI Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
