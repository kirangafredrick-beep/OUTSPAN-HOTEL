import React, { useState } from 'react';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import BookingForm from './components/BookingForm';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Reviews from './components/Reviews';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if admin is already logged in
  React.useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Listen for Ctrl+A to toggle admin
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        setShowAdmin(!showAdmin);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdmin]);

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setShowAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setShowAdmin(false);
    localStorage.removeItem('adminToken');
  };

  if (showAdmin) {
    if (!isLoggedIn) {
      return <AdminLogin onLoginSuccess={handleAdminLogin} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="App">
      <Hero />
      <Rooms />
      <BookingForm />
      <Contact />
      <Reviews />
      <ChatBot />
      <footer>
        <div className="container">
          <p>&copy; 2024 Outspan Hotel Nyeri. All rights reserved.</p>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowAdmin(true); }}>
              Admin Panel
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
