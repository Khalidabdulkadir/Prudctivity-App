import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';
import Pomodoro from './pages/Pomodoro';
import Feynman from './pages/Feynman';
import './styles/App.css';
import Tasks from './pages/Tasks';
import TaskForm from './components/TaskForm';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <div className="app">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="app-container">
              <Sidebar isOpen={isSidebarOpen} />
              <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <Routes>
                  <Route path="/" element={<Navigate to="/tasks" />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/add-tasks" element={<TaskForm />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/pomodoro" element={<Pomodoro />} />
                  <Route path="/feynman" element={<Feynman />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
