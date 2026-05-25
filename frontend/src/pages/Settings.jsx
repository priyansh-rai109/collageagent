import { useState } from 'react';
import { useStore } from '../store/useStore';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Shield, Key, Eye, EyeOff, CheckCircle, Cpu, RefreshCw } from 'lucide-react';

export default function Settings() {
  const provider = useStore(state => state.provider);
  const model = useStore(state => state.model);
  const geminiApiKey = useStore(state => state.geminiApiKey);
  const groqApiKey = useStore(state => state.groqApiKey);

  const setProvider = useStore(state => state.setProvider);
  const setModel = useStore(state => state.setModel);
  const setGeminiApiKey = useStore(state => state.setGeminiApiKey);
  const setGroqApiKey = useStore(state => state.setGroqApiKey);

  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const triggerSaveNotification = (label) => {
    setSaveStatus(label);
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const modelsMap = {
    local: [
      { id: 'offline-rag-v1', name: 'Offline RAG (FastAPI + ChromaDB)' }
    ],
    gemini: [
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Recommended - Near Instant)' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Deep Reasoner)' }
    ],
    groq: [
      { id: 'llama3-70b', name: 'Llama 3 70B (High-Performance Chat)' },
      { id: 'mixtral-8x7b', name: 'Mixtral 8x7B (MoE Architecture)' }
    ]
  };

  const activeModels = modelsMap[provider] || modelsMap.local;

  return (
    <div className="h-full overflow-y-auto p-8 relative scrollbar-hide">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Neural Settings</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">System Configuration</h1>
            <p className="text-gray-400 text-sm mt-1">
              Select your artificial intelligence engine and update secure credentials below.
            </p>
          </div>

          {/* Saved Status Indicator */}
          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
            >
              <CheckCircle className="w-4 h-4 animate-bounce" />
              <span>{saveStatus}</span>
            </motion.div>
          )}
        </motion.div>

        {/* 1. Core AI Provider Selection Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Local Provider Option */}
          <div
            onClick={() => { setProvider('local'); triggerSaveNotification('AI core updated to local'); }}
            className={`cursor-pointer rounded-2xl transition-all duration-300 ${provider === 'local' ? 'ring-2 ring-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)]' : 'opacity-70 hover:opacity-100'}`}
          >
            <Card glowing={provider === 'local'} className="h-full">
              <div className="flex flex-col gap-4 text-center items-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Local RAG Core</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Uses local Python FastAPI knowledge server. Fully offline-safe.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Gemini Provider Option */}
          <div
            onClick={() => { setProvider('gemini'); triggerSaveNotification('AI core updated to Gemini'); }}
            className={`cursor-pointer rounded-2xl transition-all duration-300 ${provider === 'gemini' ? 'ring-2 ring-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.3)]' : 'opacity-70 hover:opacity-100'}`}
          >
            <Card glowing={provider === 'gemini'} className="h-full">
              <div className="flex flex-col gap-4 text-center items-center py-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Google Gemini</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Streams direct content using your custom generative Gemini key.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Groq Provider Option */}
          <div
            onClick={() => { setProvider('groq'); triggerSaveNotification('AI core updated to Groq'); }}
            className={`cursor-pointer rounded-2xl transition-all duration-300 ${provider === 'groq' ? 'ring-2 ring-purple-500 shadow-[0_0_25px_rgba(139,92,246,0.3)]' : 'opacity-70 hover:opacity-100'}`}
          >
            <Card glowing={provider === 'groq'} className="h-full">
              <div className="flex flex-col gap-4 text-center items-center py-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Groq Cloud</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Access blazing fast open-weight models (Llama 3, Mixtral) with low-latency.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* 2. Provider API Credentials Card */}
        {provider !== 'local' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Card title="Secure API Credentials" Icon={Key}>
              <div className="space-y-6 pt-2">
                {provider === 'gemini' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                      Gemini API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showGeminiKey ? 'text' : 'password'}
                        value={geminiApiKey}
                        onChange={(e) => { setGeminiApiKey(e.target.value); triggerSaveNotification('Gemini key updated'); }}
                        placeholder="AIzaSy..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-black/60 transition-all text-white font-mono"
                      />
                      <button
                        onClick={() => setShowGeminiKey(!showGeminiKey)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      Keys are saved in local storage. Obtain keys at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI Studio</a>.
                    </span>
                  </div>
                )}

                {provider === 'groq' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
                      Groq API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showGroqKey ? 'text' : 'password'}
                        value={groqApiKey}
                        onChange={(e) => { setGroqApiKey(e.target.value); triggerSaveNotification('Groq key updated'); }}
                        placeholder="gsk_..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all text-white font-mono"
                      />
                      <button
                        onClick={() => setShowGroqKey(!showGroqKey)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                      >
                        {showGroqKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      Keys are saved in local storage. Obtain keys at <a href="https://console.groq.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Groq Console</a>.
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* 3. Model Parameters Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card title="Active Model Parameters" Icon={Cpu}>
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Selected Model
                </label>
                <select
                  value={model}
                  onChange={(e) => { setModel(e.target.value); triggerSaveNotification('Active model updated'); }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 text-white cursor-pointer select-none"
                >
                  {activeModels.map((m) => (
                    <option key={m.id} value={m.id} className="bg-surface text-white">
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[10px] text-gray-500 leading-relaxed">
                The active model dictates the response capability. Gemini 1.5 Flash provides optimal speeds, while Llama 3 70B yields high performance on general reasoning tasks.
              </span>
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
