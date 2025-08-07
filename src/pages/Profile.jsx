import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserProfile } from '../features/user/authSlice';
import { clearCart } from '../features/cart/cartSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });

  // Initialize form data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile({
        id: user.id,
        userData: formData
      })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="bg-white !p-8 rounded-xl shadow-md border border-blue-100">
          <p className="text-gray-600 text-lg font-medium">User not found. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center !px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 !my-10">
        {/* Profile Header */}
        <div className="bg-blue-600 !py-6 !px-8 text-center">
          <div className="flex flex-col items-center">
            <img
              src={isEditing ? formData.avatar : user.avatar}
              alt={isEditing ? formData.name : user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <h2 className="!mt-4 text-2xl font-bold text-white">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-blue-500 text-white text-center font-bold rounded !px-2 !py-1 w-full"
                />
              ) : (
                user.name
              )}
            </h2>
            <span className="!mt-1 !px-3 !py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Customer'}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="!p-8">
          {error && (
            <div className="!mb-4 !p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col !py-3 border-b border-gray-100">
                  <label className="text-gray-600 font-medium !mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded !px-3 !py-2"
                    required
                  />
                </div>
                
                <div className="flex flex-col !py-3 border-b border-gray-100">
                  <label className="text-gray-600 font-medium !mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded !px-3 !py-2"
                    required
                  />
                </div>
                
                <div className="flex flex-col !py-3 border-b border-gray-100">
                  <label className="text-gray-600 font-medium !mb-1">Avatar URL</label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    className="border rounded !px-3 !py-2"
                  />
                </div>
                
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Account Type</span>
                  <span className="text-gray-800 font-semibold capitalize">{user.role || 'customer'}</span>
                </div>
                
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">User ID</span>
                  <span className="text-gray-800 font-semibold font-mono">{user.id}</span>
                </div>
              </div>

              <div className="!mt-8 flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="!px-6 !py-2.5 !my-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="!px-6 !py-2.5 !my-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="space-y-4">
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Full Name</span>
                  <span className="text-gray-800 font-semibold">{user.name}</span>
                </div>
                
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Email Address</span>
                  <span className="text-gray-800 font-semibold">{user.email}</span>
                </div>
                
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Avatar URL</span>
                  <span className="text-gray-800 font-semibold truncate max-w-xs">{user.avatar}</span>
                </div>
                
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Account Type</span>
                  <span className="text-gray-800 font-semibold capitalize">{user.role || 'customer'}</span>
                </div>
                
                <div className="flex justify-between items-center !py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">User ID</span>
                  <span className="text-gray-800 font-semibold font-mono">{user.id}</span>
                </div>
              </div>

              <div className="!mt-8 flex justify-center gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="!px-6 !py-2.5 !my-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="!px-6 !py-2.5 !my-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg shadow-sm transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;