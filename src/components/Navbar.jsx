import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseLinkStyles = 'flex items-center px-4 h-12 text-gray-700 hover:text-blue-600 transition-colors duration-200';
  const activeLinkStyles = '!text-blue-600 font-semibold border-b-2 border-blue-600';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <NavLink to="/" className="text-xl font-bold text-blue-600" style={{marginLeft:'5px'}}>
        🛒 MyShop
      </NavLink>

      <div className="hidden md:flex items-center gap-6 !pr-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${baseLinkStyles} ${activeLinkStyles}` : baseLinkStyles
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products/"
          className={({ isActive }) =>
            isActive ? `${baseLinkStyles} ${activeLinkStyles}` : baseLinkStyles
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive ? `${baseLinkStyles} ${activeLinkStyles}` : baseLinkStyles
          }
        >
          Checkout
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${baseLinkStyles} relative ${isActive ? activeLinkStyles : ''}`
          }
        >
          <ShoppingCart className="w-6 h-6" style={{marginRight:'5px'}} />
          {totalQuantity > 0 && (
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${baseLinkStyles} relative ${isActive ? activeLinkStyles : ''}`
          }
        >
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </NavLink>
        
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none "
          style={{marginRight:'5px'}}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-lg py-2 z-50">
          <NavLink
            to="/"
            end
            onClick={toggleMenu}
            style={{paddingLeft:'5px'}}
            className={({ isActive }) =>
              `block px-6 py-3 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/products/"
            onClick={toggleMenu}
            style={{paddingLeft:'5px'}}
            className={({ isActive }) =>
              `block px-6 py-3 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            Products
          </NavLink>
          
          <NavLink
            to="/checkout"
            onClick={toggleMenu}
            style={{paddingLeft:'5px'}}
            className={({ isActive }) =>
              `block px-6 py-3 ${isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            Checkout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;