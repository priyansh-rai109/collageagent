// RAG Local Database content embedded to support fully client-side context injection
const RAG_DATA = {
  academic: `# JIET Academic Knowledge Base

# Academic Calendar
## Odd Semester
- Semester Start: July
- Mid-Term Exams: September
- Practical Exams: November
- End Semester Exams: December

## Even Semester
- Semester Start: January
- Mid-Term Exams: March
- Practical Exams: May
- End Semester Exams: June

# Attendance Rules
## Minimum Attendance
Students must maintain:
- minimum 75% attendance
- low attendance may restrict exam eligibility

## Attendance Shortage Rules
- Medical leave requires documentation
- Attendance warnings may be issued
- Parent communication may occur for low attendance

# Examination Rules
## Internal Assessment
Components:
- Mid-Term Exams
- Assignments
- Practical Performance
- Quiz Assessments

## End Semester Examination
- Conducted at semester end
- Includes theory and practical exams

# Grading System
## Grade Scale
- O Grade → Outstanding
- A+ Grade → Excellent
- A Grade → Very Good
- B Grade → Good
- C Grade → Average
- F Grade → Fail

# Assignment Rules
- Assignments must be submitted before deadline
- Late submissions may receive penalties
- Plagiarism is prohibited

# Computer Science Engineering Subjects
## 1st Year Subjects
- Engineering Mathematics
- Physics
- Basic Electrical Engineering
- Programming Fundamentals

## 2nd Year Subjects
- Data Structures
- DBMS
- Computer Organization
- Operating Systems

## 3rd Year Subjects
- Computer Networks
- Artificial Intelligence
- Software Engineering
- Machine Learning

## 4th Year Subjects
- Cloud Computing
- Cyber Security
- Big Data Analytics
- Major Project

# AI/ML Department Subjects
- Python Programming
- Machine Learning
- Deep Learning
- Natural Language Processing
- Computer Vision
- Data Science

# Cyber Security Subjects
- Ethical Hacking
- Cryptography
- Network Security
- Digital Forensics
- Secure Programming

# Laboratory Rules
- Students must carry ID cards
- Maintain discipline in labs
- Food and drinks are prohibited
- System misuse is prohibited

# Academic Resources
Students can access:
- lecture notes
- lab manuals
- e-books
- research papers
- previous year papers

# Timetable Information
## Working Days
- Monday to Saturday

## Typical Timings
- First Lecture: 9:00 AM
- Last Lecture: 4:00 PM

# Practical Sessions
- Labs are conducted weekly
- Attendance in practicals is mandatory

# Academic Facilities
- Smart classrooms
- High-speed WiFi
- Central library
- Computer labs
- Research centers`,

  "college-info": `# JIET College Information Knowledge Base

# College Overview
JIET College is an educational institution focused on engineering education, technology innovation, research, student development, and industry collaboration. The campus provides modern academic and student facilities.

# Campus Facilities
## Available Facilities
- Smart Classrooms
- Central Library
- WiFi Campus
- Computer Labs
- Research Labs
- Sports Facilities
- Seminar Halls
- Cafeteria
- Medical Support

# Library Information
## Library Features
- Large collection of books
- Research journals
- Digital resources
- E-library access
- Reading halls

## Library Timings
- Monday to Saturday
- Opening Time: 8:00 AM
- Closing Time: 8:00 PM

# Hostel Information
## Hostel Facilities
- Separate hostels for boys and girls
- WiFi access
- Mess facilities
- Security systems
- Study rooms
- Common rooms

## Hostel Rules
- Students must follow hostel timings.
- ID cards are mandatory.
- Discipline must be maintained.

# Scholarship Information
## Scholarship Support
Students may apply for:
- merit-based scholarships
- government scholarships
- category-based scholarships
- financial assistance schemes

# Events and Activities
## Campus Events
- Technical Fest (Resonance)
- Cultural Fest
- Hackathons
- Workshops
- Seminars
- Sports Events

# Student Clubs
## Available Clubs
- Coding Club (ByteCraft)
- Robotics Club
- Cultural Club
- Sports Club
- Entrepreneurship Cell

# Student Support Services
## Available Support
- Academic counseling
- Career guidance
- Placement support
- Mental wellness support
- Technical training

# Placement Cell
## Placement Activities
- Campus recruitment drives
- Internship opportunities
- Resume preparation sessions
- Mock interviews
- Aptitude training

# Important Contacts
## Student Support Contacts
- Examination Cell
- Hostel Office
- Transport Office
- Placement Cell
- Administration Office

# Campus Rules
## General Rules
- Students must carry ID cards.
- Maintain discipline inside campus.
- Ragging is strictly prohibited.
- Respect college property.

# Anti-Ragging Policy
JIET follows strict anti-ragging policies. Students involved in ragging activities may face disciplinary action, suspension, or legal consequences.

# Cafeteria Information
## Cafeteria Services
- Snacks
- Meals
- Beverages
- Student seating area

# Sports Facilities
## Available Sports
- Cricket
- Football
- Volleyball
- Basketball
- Indoor Games

# Medical Support
## Medical Services
- First aid support
- Emergency assistance
- Medical room access`,

  transport: `# JIET Transport Knowledge Base

# Transport Overview
JIET College provides transportation facilities for students and staff across Jodhpur and nearby regions.
The transport system includes comfort buses, fixed pickup routes, trained drivers, and scheduled timings.

# Bus Facilities
- Comfortable seating
- Daily transport service
- Safety measures
- Regular maintenance
- GPS-enabled monitoring

# Bus Routes
## Route 1 — Paota Area
- Pickup Points: Paota Circle, Jalori Gate, Shastri Nagar, College Campus
- Morning Timing: Starting Time: 7:15 AM
- Evening Timing: Departure From Campus: 4:15 PM

## Route 2 — Ratanada Area
- Pickup Points: Ratanada Circle, Air Force Area, Residency Road, College Campus
- Morning Timing: Starting Time: 7:25 AM
- Evening Timing: Departure From Campus: 4:20 PM

## Route 3 — Mandore Area
- Pickup Points: Mandore, Banar Road, Nagaur Road, College Campus
- Morning Timing: Starting Time: 7:00 AM
- Evening Timing: Departure From Campus: 4:10 PM

# Transport Rules
## General Rules
- Students must carry college ID cards.
- Maintain discipline inside buses.
- Damage to bus property is prohibited.
- Follow driver and transport staff instructions.

# Safety Rules
- Do not stand near doors while bus is moving.
- Avoid distracting the driver.
- Emergency exits should not be blocked.

# Transport Fees
## Fee Information
Transport fees may vary depending on route distance, pickup location, and semester. Students should contact transport office for exact fee details.

# Driver Information
## Driver Responsibilities
- Follow assigned routes
- Maintain student safety
- Report transport issues
- Maintain schedule discipline

# Transport Office Information
- Route inquiries
- Fee support
- Bus allocation
- Complaint handling
- Lost item support

# Complaint Handling
Students Can Report bus delays, route issues, driver complaints, or safety concerns. Complaints should be submitted to transport office.

# Timings
- Morning Arrival: Before 9:00 AM
- Evening Departure: After college hours`,

  department: `# JIET Department Information Knowledge Base

# Computer Science & Engineering Department
- HOD: Dr. Sanjay Bhandari
- Labs: Operating Systems Lab, Database Lab, Web Technologies Lab, AI Lab
- Research Areas: Machine Learning, Computer Vision, Cyber Security
- Location: Block A, Second Floor

# AI/ML Department
- Specialization: Artificial Intelligence and Machine Learning
- Labs: Advanced Computation Lab, Deep Learning Center
- HOD: Dr. Ankit Kumar
- Major Projects: Autonomous Robotics, Predictive Modeling
- Location: Block B, Third Floor

# Cyber Security Department
- Focus: Ethical Hacking, Network Defense, Forensic Analysis
- Labs: Information Security Lab, Cyber Range Lab
- HOD: Dr. Priyesh Singh
- Collaborations: EC-Council, Palo Alto Networks
- Location: Block A, First Floor

# Civil Engineering Department
- Focus: Structure Analysis, Geotechnical Studies, Transportation
- Labs: Concrete Lab, Fluid Mechanics Lab, Surveying Lab
- HOD: Dr. Rajesh Mathur
- Location: Block C, Ground Floor`
};

// Client-side lightweight search keyword matcher identical to backend uvicorn python algorithm
function searchClientRAG(agentId, query) {
  // Convert standard react ids to RAG map keys if needed
  const key = agentId === 'collegeInfo' ? 'college-info' : agentId;
  const content = RAG_DATA[key];
  if (!content) return "";
  
  const sections = content.split(/\n---\n|#+/).map(s => s.trim()).filter(Boolean);
  const queryWords = query.toLowerCase().match(/\w+/g) || [];
  if (queryWords.length === 0) return "";
  
  let bestSection = "";
  let maxMatches = 0;
  
  for (const section of sections) {
    const sectionLower = section.toLowerCase();
    let matches = 0;
    for (const word of queryWords) {
      if (word.length > 2 && sectionLower.includes(word)) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestSection = section;
    }
  }
  
  // Return the section if we have solid match relevance, otherwise return empty to use generic guidance
  return maxMatches >= 1 ? bestSection : "";
}

// Prepare the unified System Prompt containing matched RAG Context
function getSystemPrompt(agentId, query) {
  const context = searchClientRAG(agentId, query);
  
  const agentNames = {
    academic: "Academic AI Agent",
    department: "Department Information Agent",
    transport: "Transport Management Agent",
    collegeInfo: "College Information Agent"
  };
  
  const name = agentNames[agentId] || "JIET AI Assistant";

  return `You are the specialized **JIET ${name}**, an advanced autonomous intelligence module of the college's neural operating system (JIET OS).
Your primary objective is to assist students, staff, and visitors with academic, hostel, bus, and departmental details at JIET.

Official JIET College Database Verified Context:
"""
${context || 'No specific database section matched. Use general college knowledge.'}
"""

Rules:
1. Ground your answers in the Verified Context whenever available. 
2. If context doesn't contain the specific details, answer using general college patterns, maintaining a professional, highly encouraging academic tone.
3. Incorporate beautiful markdown styling in your streaming response (bullet points, bold highlights, tables).
4. Never state "Based on the provided context" or refer to search-matching. Simply respond as the all-knowing centralized college intelligence.`;
}

/**
 * Streams response chunks from Google Gemini API
 */
export async function streamGemini(apiKey, model, agentId, query, history, onChunk) {
  let activeModel = model;
  if (model === 'gemini-1.5-flash') activeModel = 'gemini-3.5-flash';
  if (model === 'gemini-1.5-pro') activeModel = 'gemini-2.5-pro';

  const contents = [];
  const systemPrompt = getSystemPrompt(agentId, query);

  // Gemini expects history in conversational role pairs
  history.forEach(msg => {
    if (msg.content) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }
  });

  // Current message with context injected
  contents.push({
    role: 'user',
    parts: [{ text: `${systemPrompt}\n\nUser Query: ${query}` }]
  });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:streamGenerateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini Stream Error (${response.status}): ${errText || response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // Resilient text-matching regex to extract streaming candidates directly from stream chunk bounds
  const textRegex = /"text"\s*:\s*"((?:[^"\\]|\\.)*)"/g;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    
    let match;
    let lastIndex = 0;
    while ((match = textRegex.exec(buffer)) !== null) {
      const escapedText = match[1];
      try {
        // Decode JS string escape sequences
        const decodedText = JSON.parse('"' + escapedText + '"');
        if (decodedText) {
          onChunk(decodedText);
        }
      } catch (err) {
        // Safe fail on incomplete escaped bounds
      }
      lastIndex = textRegex.lastIndex;
    }
    buffer = buffer.substring(lastIndex);
  }
}

/**
 * Streams response chunks from Groq API (OpenAI SSE standard)
 */
export async function streamGroq(apiKey, model, agentId, query, history, onChunk) {
  let activeModel = model;
  if (model === 'llama3-70b') activeModel = 'llama-3.3-70b-versatile';
  if (model === 'mixtral-8x7b') activeModel = 'mixtral-8x7b-32768';

  const systemPrompt = getSystemPrompt(agentId, query);

  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  history.forEach(msg => {
    if (msg.content) {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    }
  });

  messages.push({ role: 'user', content: query });

  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: activeModel,
      messages,
      stream: true,
      temperature: 0.4,
      max_tokens: 1024
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq Stream Error (${response.status}): ${errText || response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || ""; // Save partial line for next buffer read

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed === 'data: [DONE]') continue;
      
      if (trimmed.startsWith('data: ')) {
        try {
          const parsed = JSON.parse(trimmed.substring(6));
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch (err) {
          // Safe fail on incomplete chunk parsed
        }
      }
    }
  }
}
