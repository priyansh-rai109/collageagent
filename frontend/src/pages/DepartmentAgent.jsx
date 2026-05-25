import ChatWindow from '../components/chat/ChatWindow';

export default function DepartmentAgent() {
  return (
    <ChatWindow 
      agentId="department"
      agentName="Department AI"
      description="Expert knowledge base covering faculty profiles, laboratory facilities, research initiatives, and department-specific protocols."
    />
  );
}
