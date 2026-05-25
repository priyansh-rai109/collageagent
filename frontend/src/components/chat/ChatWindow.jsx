import { useEffect, useRef, useState } from 'react';
import { Send, Cpu, Loader2, Trash2, ShieldAlert } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { chatAPI } from '../../services/api';
import { streamGemini, streamGroq } from '../../services/providers';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import Orb from '../ui/Orb';
import { Link } from 'react-router-dom';

export default function ChatWindow({ agentId, agentName, description }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const messages = useStore(state => state.chats[agentId] || []);
  const isLoading = useStore(state => state.loading[agentId]);
  
  const addMessage = useStore(state => state.addMessage);
  const setLoading = useStore(state => state.setLoading);
  const clearHistory = useStore(state => state.clearHistory);
  
  const wsConnected = useStore(state => state.wsConnected);
  const provider = useStore(state => state.provider);
  const model = useStore(state => state.model);
  const geminiApiKey = useStore(state => state.geminiApiKey);
  const groqApiKey = useStore(state => state.groqApiKey);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const hasGeminiKey = geminiApiKey && geminiApiKey !== 'your_gemini_api_key_here' && geminiApiKey !== 'undefined' && geminiApiKey !== 'null' && geminiApiKey.trim() !== '';
  const hasGroqKey = groqApiKey && groqApiKey !== 'your_groq_api_key_here' && groqApiKey !== 'undefined' && groqApiKey !== 'null' && groqApiKey.trim() !== '';

  const isInputDisabled = () => {
    if (isLoading) return true;
    if (provider === 'local') return !wsConnected;
    if (provider === 'gemini') return !hasGeminiKey;
    if (provider === 'groq') return !hasGroqKey;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isInputDisabled()) return;

    const userMsg = input.trim();
    setInput('');
    
    const startTime = Date.now();
    
    // 1. Add user message
    addMessage(agentId, { 
      role: 'user', 
      content: userMsg, 
      timestamp: new Date().toISOString() 
    });
    
    setLoading(agentId, true);

    try {
      // 2. Add empty AI placeholder message for streaming content
      addMessage(agentId, { 
        role: 'ai', 
        content: '', 
        timestamp: new Date().toISOString() 
      });

      if (provider === 'local') {
        // FastAPI local route (streams back via WebSocket connection)
        await chatAPI.sendMessage(agentId, userMsg);
      } else if (provider === 'gemini') {
        // Get history context (excluding current empty placeholder and userMsg)
        const chatLogs = useStore.getState().chats[agentId] || [];
        const history = chatLogs.slice(0, -2);
        
        await streamGemini(
          geminiApiKey,
          model,
          agentId,
          userMsg,
          history,
          (chunk) => {
            useStore.getState().updateStreamingMessage(agentId, chunk);
          }
        );

        // Update latency metrics
        const latency = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
        useStore.getState().updateResponseTime(latency);
      } else if (provider === 'groq') {
        const chatLogs = useStore.getState().chats[agentId] || [];
        const history = chatLogs.slice(0, -2);
        
        await streamGroq(
          groqApiKey,
          model,
          agentId,
          userMsg,
          history,
          (chunk) => {
            useStore.getState().updateStreamingMessage(agentId, chunk);
          }
        );

        // Update latency metrics
        const latency = parseFloat(((Date.now() - startTime) / 1000).toFixed(2));
        useStore.getState().updateResponseTime(latency);
      }
    } catch (error) {
      console.error('Failed to communicate with active AI stream:', error);
      const errorMsg = error?.message || 'Unknown error occurred.';
      // Inject alert block to render beautifully inside MessageBubble markdown
      useStore.getState().updateStreamingMessage(
        agentId,
        `\n\n> [!CAUTION]\n> **Neural Core Offline**\n> Failed to establish stream with ${provider === 'local' ? 'Local FastAPI' : provider.toUpperCase()}.\n>\n> *Details: ${errorMsg}*\n>\n> Please check API key status, local server logs, and internet connection.`
      );
    } finally {
      setLoading(agentId, false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface/30 relative">
      
      {/* Dynamic Header Info */}
      <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between shrink-0 bg-gradient-to-b from-surface/80 to-transparent backdrop-blur-sm z-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight neon-text flex items-center gap-3">
            <Cpu className="w-6 h-6 text-primary" />
            {agentName}
          </h1>
          <p className="text-gray-500 text-xs max-w-xl truncate leading-relaxed">
            {description}
          </p>
        </div>

        {/* Clear Isolated Chat Log */}
        {messages.length > 0 && (
          <button
            onClick={() => clearHistory(agentId)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flush Memory</span>
          </button>
        )}
      </div>

      {/* Messages Feed View */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide">
        {messages.length === 0 ? (
          
          /* Holographic Neural Orb in Empty State */
          <div className="flex-1 flex items-center justify-center flex-col gap-6 select-none">
            <Orb size="large" />
            <div className="text-center space-y-1 z-10">
              <p className="text-xs tracking-widest text-gray-500 uppercase font-mono font-bold">
                Awaiting Connection Link...
              </p>
              <p className="text-[10px] text-gray-600 font-mono">
                Active provider: {provider.toUpperCase()} ({model})
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} isLast={idx === messages.length - 1} />
          ))
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Command Input Area */}
      <div className="p-6 shrink-0 relative bg-gradient-to-t from-surface via-surface/90 to-transparent pt-8">
        
        {/* API Credentials or Socket Status Warnings */}
        {!wsConnected && provider === 'local' && (
          <div className="flex items-center gap-2 text-red-400 text-xs justify-center mb-3 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>SYSTEM CORPS OFFLINE. START LOCAL FASTAPI SERVER OR CONFIGURE SETTINGS KEYS.</span>
          </div>
        )}
        {!hasGeminiKey && provider === 'gemini' && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs justify-center mb-3 font-mono">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>GEMINI KEY MISSING. <Link to="/settings" className="underline hover:text-white font-bold">INITIATE SECURITY BINDINGS</Link></span>
          </div>
        )}
        {!hasGroqKey && provider === 'groq' && (
          <div className="flex items-center gap-2 text-purple-400 text-xs justify-center mb-3 font-mono">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>GROQ KEY MISSING. <Link to="/settings" className="underline hover:text-white font-bold">INITIATE SECURITY BINDINGS</Link></span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl blur-xl opacity-50 pointer-events-none"></div>
          <div className="relative flex items-center bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl focus-within:border-primary/50 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isInputDisabled() ? 'Input disabled. Review engine keys...' : `Transmit queries to ${agentName}...`}
              className="flex-1 bg-transparent border-none px-6 py-4 text-white focus:outline-none placeholder:text-gray-600 text-sm focus:bg-black/20"
              disabled={isInputDisabled()}
            />
            <button
              type="submit"
              disabled={!input.trim() || isInputDisabled()}
              className="px-6 py-4 text-primary hover:text-white disabled:opacity-30 disabled:hover:text-primary transition-colors flex items-center justify-center bg-white/5 hover:bg-primary/20 border-l border-white/5 cursor-pointer"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
