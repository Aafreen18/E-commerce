import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContinueShoppingCarousel from './ContinueShoppingCarousel';

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="">
      <h2 className={`text-2xl font-bold !p-3 ${items.length > 0 ? "text-left" : "text-center"}`}>
        Your Cart
      </h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white !px-2 !py-1 rounded-md hover:bg-blue-700 transition-colors w-fit"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="flex flex-col h-full">
  
          <div className="bg-blue-100 flex-grow rounded-xl !p-3 shadow-lg sm:p-8 mx-4 sm:mx-10 my-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
              <div className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">
                Total Amount: <span className="text-blue-600 font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="bg-white !p-2 !m-2 rounded-lg text-blue-600 font-semibold shadow hover:transform transition-transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

          
        <ContinueShoppingCarousel/>
            
        
      </div>


        </>
      )}
    </div>
  );
};

export default Cart;