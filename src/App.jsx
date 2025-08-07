import { Routes, Route, Navigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import axios from 'axios';
import { logout, updateUser } from './features/user/authSlice'; // Ensure this import is correct

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: { Authorization: `Bearer ${access_token}` }
        });

        if (res.data?.email) {
          dispatch(updateUser(res.data));
          setCheckingAuth(false);
        } else {
          localStorage.removeItem('access_token');
          dispatch(logout());
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        localStorage.removeItem('access_token');
        dispatch(logout());
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (checkingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
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