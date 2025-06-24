import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="">
      <h2 className={`text-2xl font-bold mb-6 ${items.length > 0 ? "text-left" : "text-center"}`}>
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
          <div className="text-right font-bold text-xl mt-4">
            Total Amount: ${totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;