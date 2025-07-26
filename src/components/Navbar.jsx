import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(user || token);

  const baseLinkStyles = 'flex items-center justify-center !px-4 h-full text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium';
  const activeLinkStyles = '!text-blue-600 border-b-2 border-blue-600';

  useEffect(() => {
    const fetchProfile = async () => {
      if (token && !user && !profile) {
        setLoading(true);
        try {
          const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setProfile(response.data);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [token, user, profile, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentUser = user || profile;
  const firstName = currentUser?.name?.split(' ')[0] || '';
  const avatar = currentUser?.avatar;

  return (
    <nav className="flex justify-between items-center !px-6 lg:!px-8 !py-4 shadow-md bg-white sticky top-0 z-50 h-20 lg:h-24">
      {/* Logo */}
      <NavLink 
        to="/" 
        className="text-2xl font-bold text-blue-600 flex items-center justify-center h-full"
      >
        <span className="bg-black text-white !px-3 !py-1 rounded !mr-2">SHOP</span>
        <span className="hidden sm:inline">MARKET</span>
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-center h-full lg:gap-1">
        {['/', '/products', '/checkout'].map((path, i) => (
          <NavLink 
            key={i}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `${baseLinkStyles} ${isActive ? activeLinkStyles : ''} !mx-1`
            }
          >
            {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
          </NavLink>
        ))}

        {isAuthenticated && (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center justify-center h-full !px-4 !mx-1 gap-2 ${isActive ? activeLinkStyles : ''} ${baseLinkStyles}`
            }
          >
            <div className="relative">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={firstName.charAt(0).toUpperCase()} 
                  className="w-8 h-8 rounded-full object-cover bg-blue-500 text-sm font-medium flex items-center justify-center"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium">
              {loading ? '...' : firstName}
            </span>
          </NavLink>
        )}

        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            `flex items-center justify-center h-full !px-4 !mx-1 relative gap-2 ${isActive ? activeLinkStyles : ''} ${baseLinkStyles}`
          }
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {totalQuantity}
              </span>
            )}
          </div>
          <span className="text-sm font-medium hidden lg:inline">Cart</span>
        </NavLink>
      </div>

      {/* Mobile Icons */}
      <div className="md:hidden flex items-center justify-center gap-2">
        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            `flex items-center justify-center h-12 w-12 relative ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 transition-colors duration-200`
          }
        >
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {totalQuantity}
            </span>
          )}
        </NavLink>

        {isAuthenticated && (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center justify-center h-12 w-12 relative ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 transition-colors duration-200`
            }
          >
            {avatar ? (
              <img 
                src={avatar} 
                alt={firstName.charAt(0).toUpperCase()} 
                className="w-8 h-8 rounded-full object-cover bg-blue-500 text-sm font-medium flex items-center justify-center"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">
                  {firstName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </NavLink>
        )}

        <button 
          onClick={toggleMenu} 
          className="!p-2 text-gray-800 hover:text-blue-600 focus:outline-none transition-colors duration-200 flex items-center justify-center"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 mt-20">
          <div className="bg-white shadow-lg animate-slideDown">
            {['/', '/products', '/checkout'].map((path, i) => (
              <NavLink 
                key={i}
                to={path}
                end={path === '/'}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block !px-6 !py-4 text-lg border-b border-gray-100 ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-800 hover:bg-gray-50'} transition-all duration-200`
                }
              >
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink 
                to="/profile" 
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center !px-6 !py-4 text-lg gap-3 ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-800 hover:bg-gray-50'} transition-all duration-200`
                }
              >
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt={firstName.charAt(0).toUpperCase()} 
                    className="w-8 h-8 rounded-full object-cover bg-blue-500 text-sm font-medium flex items-center justify-center"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">
                      {firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {loading ? 'Loading...' : `My Profile (${firstName})`}
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
