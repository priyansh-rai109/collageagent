import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/Dashboard';
import AcademicAgent from './pages/AcademicAgent';
import DepartmentAgent from './pages/DepartmentAgent';
import TransportAgent from './pages/TransportAgent';
import CollegeInfoAgent from './pages/CollegeInfoAgent';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background overflow-hidden font-['Inter'] relative text-white">
        
        {/* Immersive Futuristic Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0 z-10">
          <Navbar />
          
          <main className="flex-1 overflow-hidden bg-black/10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/academic" element={<AcademicAgent />} />
              <Route path="/department" element={<DepartmentAgent />} />
              <Route path="/transport" element={<TransportAgent />} />
              <Route path="/college-info" element={<CollegeInfoAgent />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
