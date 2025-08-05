import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // to prevent premature rendering
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        // User exists
        if (res.data && res.data.email) {
          setIsAuthenticated(true);
          setCheckingAuth(false);
          navigate('/');
        } else {
          // Invalid user profile
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setCheckingAuth(false);
          navigate('/login');
        }
      } catch (error) {
        // Token invalid or network error
        console.error('Authentication failed:', error);
        setIsAuthenticated(false);
        setCheckingAuth(false);
        navigate('/login');
      }
    };

    checkAuth();
  }, []);

  const handleSuccessfulAuth = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  if (checkingAuth) return null; // optional: or a loading spinner

  return (
    <>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleSuccessfulAuth} />
            )
          } 
        />
        
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <main className="min-h-[calc(100vh-250px)]">
                  <AppRoutes />
                </main>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </>
  );
};

export default App;
