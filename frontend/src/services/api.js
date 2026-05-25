import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (agentId, message) => {
    try {
      const response = await api.post(`/chat/${agentId}`, { message });
      return response.data;
    } catch (error) {
      console.error(`Error sending message to ${agentId}:`, error);
      throw error;
    }
  },
  getHistory: async (agentId) => {
    try {
      const response = await api.get(`/chat/${agentId}/history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for ${agentId}:`, error);
      throw error;
    }
  }
};
