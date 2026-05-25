import ChatWindow from '../components/chat/ChatWindow';

export default function TransportAgent() {
  return (
    <ChatWindow 
      agentId="transport"
      agentName="Transport AI"
      description="Real-time logistics coordinator managing bus routes, schedules, fleet availability, and transit pass information."
    />
  );
}
