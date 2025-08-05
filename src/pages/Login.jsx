import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/authSlice'; // adjust path if needed

const Login = ({ onLogin }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', avatar: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Dispatch login action
        const resultAction = await dispatch(loginUser({ 
          email: formData.email, 
          password: formData.password 
        }));

        // Check if login was successful
        if (loginUser.fulfilled.match(resultAction)) {
          onLogin(); // This will set isAuthenticated to true and navigate to home
        } else {
          // Check if 401 error
          if (resultAction.error && resultAction.error.message.includes("401")) {
            // Try refreshing token
            const refreshResult = await dispatch(refreshAccessToken());
            if (refreshAccessToken.fulfilled.match(refreshResult)) {
              // Retry login after refreshing token
              const retryResult = await dispatch(
                loginUser({
                  email: formData.email,
                  password: formData.password
                })
              );
              if (loginUser.fulfilled.match(retryResult)) {
                onLogin();
              } else {
                alert(retryResult.payload || 'Login failed after token refresh.');
              }
            } else {
              alert(refreshResult.payload || 'Session expired. Please log in again.');
            }
          } else {
            alert(resultAction.payload || 'Login failed. Please check your credentials.');
          }
        }
      } else {
        // Dispatch register action
        const resultAction = await dispatch(registerUser({ userData: formData }));

        // Check if registration was successful
        if (registerUser.fulfilled.match(resultAction)) {
          onLogin(); // This will set isAuthenticated to true and navigate to home
        } else {
          // Show error message if registration failed
          alert(resultAction.payload || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white !p-8">
      <div className="bg-white shadow-2xl rounded-2xl !p-10 w-full max-w-md transition-all duration-500 ease-in-out transform hover:scale-[1.01] border border-gray-100">
        <div className="flex justify-center !mb-6 !pt-5">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center !mb-6 text-gray-800">
          {isLogin ? 'Welcome Back' : 'Create Account'}
          <div className="w-16 h-1 bg-blue-600 mx-auto !mt-2 rounded-full"></div>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full  !mb-2 border-2 border-gray-200 !p-3 !pl-10 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-300 outline-none placeholder-gray-400"
                  required
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="avatar"
                  placeholder="Avatar URL (optional)"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full  !mb-2 border-2 border-gray-200 !p-3 !pl-10 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-300 outline-none placeholder-gray-400"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
            </>
          )}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readOnly')}
              className="w-full !mb-2 border-2 z-10 border-gray-200 !p-3 !pl-10 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-300 outline-none "
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              readOnly
              onFocus={(e) => e.target.removeAttribute('readOnly')}
              className="w-full  !mb-2 border-2 border-gray-200 !p-3 !pl-10 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-300 outline-none placeholder-gray-400"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold !py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center ${loading ? 'opacity-80' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 !mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <div className="flex items-center !my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="!px-3 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        <p className="text-center text-gray-600">
          {isLogin ? 'New to our platform?' : 'Already have an account?'}{' '}
          <button 
            onClick={toggleForm} 
            className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors duration-300"
          >
            {isLogin ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
