import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // WebSocket Status (Exclude from persistence via partialize)
      wsConnected: false,
      setWsConnected: (status) => set({ wsConnected: status }),

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

      // Configuration Actions
      setProvider: (provider) => {
        let defaultModel = 'offline-rag-v1';
        if (provider === 'gemini') defaultModel = 'gemini-1.5-flash';
        if (provider === 'groq') defaultModel = 'llama3-70b';
        set({ provider, model: defaultModel });
      },
      setModel: (model) => set({ model }),
      setGeminiApiKey: (key) => set({ geminiApiKey: (!key || key === 'undefined' || key === 'null') ? '' : key.trim() }),
      setGroqApiKey: (key) => set({ groqApiKey: (!key || key === 'undefined' || key === 'null') ? '' : key.trim() }),

      // Actions
      addMessage: (agentId, message) => set((state) => {
        const chats = {
          ...state.chats,
          [agentId]: [...(state.chats[agentId] || []), message]
        };
        // Increment query metric when user sends a message
        let newQueries = state.metrics.totalQueries;
        if (message.role === 'user') {
          newQueries += 1;
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
          // If no AI placeholder exists, create one
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

      clearHistory: (agentId) => set((state) => ({
        chats: {
          ...state.chats,
          [agentId]: []
        }
      })),

      updateResponseTime: (timeSec) => set((state) => {
        const currentAvg = state.metrics.averageResponseTime;
        const newAvg = parseFloat(((currentAvg * 4 + timeSec) / 5).toFixed(2)); // running average
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
      // Persist only key states, histories, settings, and metrics (exclude ephemeral loading/ws statuses)
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
