import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import api from './api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ConsultationForm from './pages/ConsultationForm';
import Goals from './pages/Goals';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me').then(res => setUser(res.data)).catch(()=> {
        localStorage.removeItem('token'); setUser(null);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ paddingTop: 74 /* room for sticky nav */ }}>
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signup" element={<Signup onSignup={token => {
              localStorage.setItem('token', token);
              api.get('/auth/me').then(res => setUser(res.data));
            }} />} />
          <Route path="/login" element={<Login onLogin={(token) => {
              localStorage.setItem('token', token);
              api.get('/auth/me').then(res => setUser(res.data));
            }} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/consultation" element={<ConsultationForm user={user} />} />
          <Route path="/goals" element={<Goals user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
