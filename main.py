import asyncio
import os
import re
from typing import List, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="JIET AI OS Backend")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global store for active websocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_stream_chunk(self, agent_id: str, content: str):
        # Broadcast chunk to all connected clients (typically 1 for local dev)
        for connection in self.active_connections:
            try:
                await connection.send_json({
                    "type": "stream",
                    "agentId": agent_id,
                    "content": content
                })
            except Exception as e:
                print(f"Error sending websocket message: {e}")

manager = ConnectionManager()

class ChatRequest(BaseModel):
    message: str

# Helper to read RAG markdown and find matching context
def search_rag(agent_id: str, query: str) -> str:
    filename_map = {
        "academic": "ragfile/academic_rag_data.md",
        "department": "ragfile/department_rag_data.md",
        "transport": "ragfile/transport_rag_data.md",
        "college-info": "ragfile/college_info_rag_data.md"
    }
    
    file_path = filename_map.get(agent_id)
    if not file_path or not os.path.exists(file_path):
        return "System error: Knowledge base is currently unavailable."
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Split knowledge base by sections separated by '---'
        sections = [s.strip() for s in content.split("---") if s.strip()]
        
        # Simple keyword match
        query_words = set(re.findall(r'\w+', query.lower()))
        if not query_words:
            return "Could you please elaborate on your query?"
            
        best_section = None
        max_matches = 0
        
        for section in sections:
            section_lower = section.lower()
            matches = sum(1 for word in query_words if word in section_lower)
            if matches > max_matches:
                max_matches = matches
                best_section = section
                
        # If we have a good match, return it
        if best_section and max_matches >= 2:
            return best_section
            
        # Fallback greetings or general responses if query matches general intent
        query_lower = query.lower()
        if any(g in query_lower for g in ["hi", "hello", "hey", "greetings"]):
            agent_names = {
                "academic": "Academic AI Agent",
                "department": "Department Information Agent",
                "transport": "Transport Management Agent",
                "college-info": "College Information Agent"
            }
            return f"Hello! I am the **JIET {agent_names.get(agent_id, 'AI Agent')}**. How can I assist you today?"
            
        return "I apologize, but I could not find specific information regarding that in the college database. Please consult the **JIET Administration Office** or exam cell for official guidance."
        
    except Exception as e:
        print(f"Error parsing RAG: {e}")
        return "Error retrieving data from knowledge base."

# Stream response logic
async def stream_response(agent_id: str, response_text: str):
    # Split response into words or small chunks to simulate streaming
    chunks = re.findall(r'\S+|\s+', response_text)
    
    # Send a tiny pause at start
    await asyncio.sleep(0.5)
    
    for chunk in chunks:
        await manager.send_stream_chunk(agent_id, chunk)
        # Small delay between words/characters to make streaming look ultra realistic and cinematic
        await asyncio.sleep(0.04)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WS error: {e}")
        manager.disconnect(websocket)

@app.post("/chat/{agent_id}")
async def chat_endpoint(agent_id: str, req: ChatRequest):
    if agent_id not in ["academic", "department", "transport", "college-info"]:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    # Get structured response from our offline RAG system
    response_text = search_rag(agent_id, req.message)
    
    # Stream it in background so HTTP endpoint returns immediately
    asyncio.create_task(stream_response(agent_id, response_text))
    
    return {"status": "processing"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
