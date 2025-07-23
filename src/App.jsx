import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import React from 'react';
import Login from './pages/Login';
import { useEffect } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSuccessfulAuth = () => {
    localStorage.setItem('token', 'authenticated'); // Store a token
    setIsAuthenticated(true);
    navigate('/'); // Navigate to home after auth
  };

  return (
    <>
      <Routes>
        {/* Register route - accessible without authentication */}
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
        
        {/* Main app routes - only accessible after authentication */}
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
              <Navigate to="/register" replace />
            )
          } 
        />
      </Routes>
    </>
  );
};

export default App;