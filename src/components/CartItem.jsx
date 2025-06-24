import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decreaseQuantity } from '../features/cart/cartSlice';
import { Plus, Minus } from 'lucide-react'; 
import { RiDeleteBin5Line } from "react-icons/ri";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const increaseQty = () => {
    dispatch(addToCart(item));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    } else {
      handleRemove();
    }
  };

  return (
    <div className="flex gap-4 items-center border-b py-4">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain"
      />

      {/* Info */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
        <p className="text-blue-600 font-bold">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-2">
        <button
          onClick={decreaseQty}
          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          <Minus size={16} />
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={increaseQty}
          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={handleRemove}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        <RiDeleteBin5Line size={20}/>
      </button>
    </div>
  );
};

export default CartItem;