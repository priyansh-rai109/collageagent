import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // WebSocket Status
      wsConnected: false,
      setWsConnected: (status) => {
        set({ wsConnected: status });
        get().addLog(
          status 
            ? 'Neural RAG Link established (WebSocket sync online)' 
            : 'Neural RAG Link disconnected (WebSocket offline)', 
          status ? 'success' : 'error'
        );
      },

      // Chat Histories
      chats: {
        academic: [],
        department: [],
        transport: [],
        collegeInfo: []
      },

      // Loading States
      loading: {
        academic: false,
        department: false,
        transport: false,
        collegeInfo: false
      },

      // Provider & API Keys Configuration
      provider: 'local', // 'local' | 'gemini' | 'groq'
      model: 'offline-rag-v1', // model names matching the active provider
      geminiApiKey: (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here') ? import.meta.env.VITE_GEMINI_API_KEY : '',
      groqApiKey: (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_GROQ_API_KEY && import.meta.env.VITE_GROQ_API_KEY !== 'your_groq_api_key_here') ? import.meta.env.VITE_GROQ_API_KEY : '',

      // Metrics & Analytics
      metrics: {
        totalQueries: 0,
        averageResponseTime: 1.2,
      },

      // Real-Time Telemetry Logs
      telemetryLogs: [
        `[${new Date().toISOString()}] ⚙️ INITIALIZING JIET TELEMETRY SHELL...`,
        `[${new Date().toISOString()}] 📂 CONNECTING CHROMA VIRTUAL DATABASE...`,
        `[${new Date().toISOString()}] 🖥️ SYSTEM HOST NAME: JIET_CORE_OS_MAC`
      ],

      addLog: (message, type = 'info') => set((state) => {
        const time = new Date().toISOString();
        const prefix = type === 'error' ? '🔴' : type === 'success' ? '🟢' : '⚡';
        const formattedLog = `[${time}] ${prefix} ${message.toUpperCase()}`;
        return {
          telemetryLogs: [...(state.telemetryLogs || []).slice(-49), formattedLog]
        };
      }),

      // Configuration Actions
      setProvider: (provider) => {
        let defaultModel = 'offline-rag-v1';
        if (provider === 'gemini') defaultModel = 'gemini-3.5-flash';
        if (provider === 'groq') defaultModel = 'llama3-70b';
        set({ provider, model: defaultModel });
        get().addLog(`Switched active neural engine to ${provider} (${defaultModel})`, 'success');
      },
      setModel: (model) => {
        set({ model });
        get().addLog(`Active LLM Model configuration updated to ${model}`, 'success');
      },
      setGeminiApiKey: (key) => {
        set({ geminiApiKey: (!key || key === 'undefined' || key === 'null') ? '' : key.trim() });
        get().addLog('Gemini security bindings updated', 'info');
      },
      setGroqApiKey: (key) => {
        set({ groqApiKey: (!key || key === 'undefined' || key === 'null') ? '' : key.trim() });
        get().addLog('Groq cloud key storage updated', 'info');
      },

      // Actions
      addMessage: (agentId, message) => set((state) => {
        const chats = {
          ...state.chats,
          [agentId]: [...(state.chats[agentId] || []), message]
        };
        let newQueries = state.metrics.totalQueries;
        if (message.role === 'user') {
          newQueries += 1;
          setTimeout(() => {
            useStore.getState().addLog(`Query packet transmitted to ${agentId} agent: "${message.content.slice(0, 40)}${message.content.length > 40 ? '...' : ''}"`, 'info');
          }, 0);
        }
        return {
          chats,
          metrics: {
            ...state.metrics,
            totalQueries: newQueries
          }
        };
      }),

      updateStreamingMessage: (agentId, content) => set((state) => {
        const chat = [...(state.chats[agentId] || [])];
        const lastMessageIndex = chat.length - 1;

        if (lastMessageIndex >= 0 && chat[lastMessageIndex].role === 'ai') {
          chat[lastMessageIndex] = {
            ...chat[lastMessageIndex],
            content: chat[lastMessageIndex].content + content
          };
        } else {
          chat.push({
            role: 'ai',
            content: content,
            timestamp: new Date().toISOString()
          });
        }

        return {
          chats: {
            ...state.chats,
            [agentId]: chat
          }
        };
      }),

      setLoading: (agentId, status) => set((state) => ({
        loading: {
          ...state.loading,
          [agentId]: status
        }
      })),

      clearHistory: (agentId) => {
        set((state) => ({
          chats: {
            ...state.chats,
            [agentId]: []
          }
        }));
        get().addLog(`Purged and flushed neural memories for agent: ${agentId}`, 'error');
      },

      updateResponseTime: (timeSec) => set((state) => {
        const currentAvg = state.metrics.averageResponseTime;
        const newAvg = parseFloat(((currentAvg * 4 + timeSec) / 5).toFixed(2));
        setTimeout(() => {
          useStore.getState().addLog(`Stream chunk resolved successfully in ${timeSec} seconds.`, 'success');
        }, 0);
        return {
          metrics: {
            ...state.metrics,
            averageResponseTime: newAvg
          }
        };
      })
    }),
    {
      name: 'jiet-ai-os-storage',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState;
        if (state && state.model) {
          if (state.model === 'gemini-1.5-flash') state.model = 'gemini-3.5-flash';
          if (state.model === 'gemini-1.5-pro') state.model = 'gemini-2.5-pro';
          if (state.model === 'llama3-70b') state.model = 'llama-3.3-70b-versatile';
          if (state.model === 'mixtral-8x7b') state.model = 'mixtral-8x7b-32768';
        }
        return state;
      },
      partialize: (state) => ({
        chats: state.chats,
        provider: state.provider,
        model: state.model,
        geminiApiKey: state.geminiApiKey,
        groqApiKey: state.groqApiKey,
        metrics: state.metrics,
      }),
    }
  )
);
