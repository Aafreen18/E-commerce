import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = user || localStorage.getItem('token');

  const baseLinkStyles = 'flex items-center justify-center !px-4 h-full text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium';
  const activeLinkStyles = '!text-blue-600 border-b-2 border-blue-600';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Extract first name from user's full name
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <nav className="flex justify-between items-center !px-6 lg:!px-8 !py-4 shadow-md bg-white sticky top-0 z-50 h-20 lg:h-24">
      {/* Logo/Brand */}
      <NavLink 
        to="/" 
        className="text-2xl font-bold text-blue-600 flex items-center justify-center h-full"
      >
        <span className="bg-black text-white !px-3 !py-1 rounded !mr-2">SHOP</span>
        <span className="hidden sm:inline">MARKET</span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center h-full lg:gap-1">
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => 
            `${baseLinkStyles} ${isActive ? activeLinkStyles : ''} !mx-1`
          }
        >
          Home
        </NavLink>

        <NavLink 
          to="/products" 
          className={({ isActive }) => 
            `${baseLinkStyles} ${isActive ? activeLinkStyles : ''} !mx-1`
          }
        >
          Products
        </NavLink>

        <NavLink 
          to="/checkout" 
          className={({ isActive }) => 
            `${baseLinkStyles} ${isActive ? activeLinkStyles : ''} !mx-1`
          }
        >
          Checkout
        </NavLink>

        {/* User Profile */}
        {isAuthenticated && (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center justify-center h-full !px-4 !mx-1 gap-2 ${isActive ? activeLinkStyles : ''} ${baseLinkStyles}`
            }
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <span className="text-sm font-medium">{firstName}</span>
          </NavLink>
        )}

        {/* Cart Icon */}
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

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-center gap-2">

        {/* Cart Icon (Mobile) */}
        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            `flex items-center justify-center h-12 w-12 relative ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 transition-colors duration-200`
          }
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {totalQuantity}
              </span>
            )}
          </div>
        </NavLink>

        {/* User Icon (Mobile) */}
        {isAuthenticated && (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center justify-center h-12 w-12 relative ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 transition-colors duration-200`
            }
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
          </NavLink>
        )}

        {/* Mobile Menu Toggle */}
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
            <NavLink 
              to="/" 
              end 
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block !px-6 !py-4 text-lg border-b border-gray-100 ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-800 hover:bg-gray-50'} transition-all duration-200`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block !px-6 !py-4 text-lg border-b border-gray-100 ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-800 hover:bg-gray-50'} transition-all duration-200`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/checkout" 
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block !px-6 !py-4 text-lg border-b border-gray-100 ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-800 hover:bg-gray-50'} transition-all duration-200`
              }
            >
              Checkout
            </NavLink>
            {isAuthenticated && (
              <NavLink 
                to="/profile" 
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center !px-6 !py-4 text-lg gap-3 ${isActive ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-600' : 'text-gray-800 hover:bg-gray-50'} transition-all duration-200`
                }
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                My Profile ({firstName})
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;