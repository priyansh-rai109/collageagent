import { useStore } from '../store/useStore';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = 3000;
  }

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.ws = new WebSocket('ws://127.0.0.1:8000/ws');

    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      useStore.getState().setWsConnected(true);
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'stream' && data.agentId && data.content) {
          useStore.getState().updateStreamingMessage(data.agentId, data.content);
        }
      } catch (e) {
        console.error('Error parsing websocket message:', e);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      useStore.getState().setWsConnected(false);
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      setTimeout(() => this.connect(), this.reconnectTimeout);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export const wsService = new WebSocketService();
