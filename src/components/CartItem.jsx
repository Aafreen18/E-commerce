import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decreaseQuantity } from '../features/cart/cartSlice';
import { Plus, Minus } from 'lucide-react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CartItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  // Remove the margin and once: true to trigger animation every time
  const isInView = useInView(ref, { amount: 0.1 });

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

  // Alternate direction based on index
  const direction = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col sm:flex-row gap-4 !p-5 rounded-lg bg-white"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        marginBottom: '1rem', // Add space between items
        border: '1px solid #f3f4f6' // subtle border
      }}
      initial={{ opacity: 0, x: direction }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : direction
      }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      key={item.id} // Ensure each item has a unique key
    >
      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-32 sm:w-32 sm:h-32 object-contain rounded-lg bg-gray-50 p-2"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div className='!px-5'>
          <h4 className="text-lg font-semibold line-clamp-2">{item.title}</h4>
          <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
        </div>

        {/* Combined Quantity and Delete Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 !p-5">
            <motion.button
              onClick={decreaseQty}
              className="p-2 text-gray-700 hover:bg-blue-600 rounded-full hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus size={16} />
            </motion.button>
            
            <span className="font-medium min-w-[20px] text-center">
              {item.quantity}
            </span>
            
            <motion.button
              onClick={increaseQty}
              className="p-2 text-gray-700 hover:bg-blue-600 rounded-full hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={16} />
            </motion.button>
            
            <motion.button
              onClick={handleRemove}
              className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100 ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RiDeleteBin5Line size={18} />
            </motion.button>
          </div>

          <p className="text-lg font-bold text-blue-600">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;