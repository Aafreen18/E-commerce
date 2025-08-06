import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userFromStore = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(userFromStore || null);
  const [loading, setLoading] = useState(!userFromStore);
  const [error, setError] = useState(null);

  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userFromStore && access_token) {
        setLoading(true);
        try {
          const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          setProfile(response.data);
        } catch (err) {
          console.error(err);
          setError('Failed to load profile.');
          if (err.response?.status === 401) {
            localStorage.removeItem('access_token');
            navigate('/login');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [userFromStore, access_token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error || 'User not found.'}</p>
      </div>
    );
  }

  const { name, email, avatar } = profile;

  return (
    <div className="min-h-screen flex items-center justify-center !p-4">
    <div className="max-w-lg w-full !p-6 bg-gray-50 rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
    </div>
  );
};

export default Profile;
