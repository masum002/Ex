
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Earn from './pages/Earn';
import AddTask from './pages/AddTask';
import LandingPage from './pages/LandingPage';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for an existing session
    const savedUser = localStorage.getItem('fb_exchange_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (fbUser: User) => {
    setUser(fbUser);
    localStorage.setItem('fb_exchange_user', JSON.stringify(fbUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fb_exchange_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <main className="flex-1 container mx-auto px-4 py-6 mb-20 md:mb-0">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <LandingPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/earn" 
              element={user ? <Earn user={user} setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/add-task" 
              element={user ? <AddTask user={user} setUser={setUser} /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
