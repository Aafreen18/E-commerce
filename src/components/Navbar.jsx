import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseLinkStyles = 'flex items-center !px-4 h-full text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium';
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
        className="text-2xl font-bold text-blue-600 flex items-center h-full"
      >
        <span className="bg-black text-white !px-3 !py-1 rounded !mr-2">SHOP</span>
        <span className="hidden sm:inline">MARKET</span>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center h-full gap-1">
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
        {user && (
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex flex-col items-center justify-center h-full !px-4 !mx-1 ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 transition-colors duration-200`
            }
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            <span className="text-xs !mt-1 font-medium">{firstName}</span>
          </NavLink>
        )}

        {/* Cart Icon */}
        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            `flex items-center justify-center h-full !px-4 !mx-1 relative ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600`
          }
        >
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute top-3 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        {/* User Icon (Mobile) */}
        {user && (
          <NavLink 
            to="/profile" 
            className="flex items-center justify-center h-12 w-12 relative text-gray-800 hover:text-blue-600"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
          </NavLink>
        )}

        {/* Cart Icon (Mobile) */}
        <NavLink 
          to="/cart" 
          className={({ isActive }) => 
            `flex items-center justify-center h-12 w-12 relative ${isActive ? 'text-blue-600' : 'text-gray-800'}`
          }
        >
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute top-2 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </NavLink>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu} 
          className="!p-2 text-gray-800 hover:text-blue-600 focus:outline-none"
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
                `block !px-6 !py-4 text-lg ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-gray-50'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block !px-6 !py-4 text-lg ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-gray-50'}`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/checkout" 
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block !px-6 !py-4 text-lg ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-gray-50'}`
              }
            >
              Checkout
            </NavLink>
            {user && (
              <NavLink 
                to="/profile" 
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block !px-6 !py-4 text-lg ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-gray-50'}`
                }
              >
                My Profile
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;