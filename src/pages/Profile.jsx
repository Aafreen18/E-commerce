import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user/authSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useSelector } from 'react-redux';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="bg-white !p-8 rounded-xl shadow-md border border-blue-100">
          <p className="text-gray-600 text-lg font-medium">User not found. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const { name, email, avatar, role, id } = user;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };


  return (
    <div className="min-h-screen flex items-center justify-center !px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        {/* Profile Header */}
        <div className="bg-blue-600 !py-6 !px-8 text-center">
          <div className="flex flex-col items-center">
            <img
              src={avatar}
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <h2 className="mt-4 text-2xl font-bold text-white">{name}</h2>
            <span className="!mt-1 !px-3 !py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Customer'}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="!p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center !py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Full Name</span>
              <span className="text-gray-800 font-semibold">{name}</span>
            </div>
            <div className="flex justify-between items-center !py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Email Address</span>
              <span className="text-gray-800 font-semibold">{email}</span>
            </div>
            <div className="flex justify-between items-center !py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Account Type</span>
              <span className="text-gray-800 font-semibold capitalize">{role || 'customer'}</span>
            </div>
            <div className="flex justify-between items-center !py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">User ID</span>
              <span className="text-gray-800 font-semibold font-mono">{id}</span>
            </div>
          </div>

          <div className="!mt-8 flex justify-center gap-4 overflow-hidden">
            <button className="!px-6 !py-2.5 !my-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Edit Profile
            </button>
            <button onClick={handleLogout} className="!px-6 !py-2.5 !my-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;