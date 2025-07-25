import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { ShoppingCart } from 'lucide-react'; 
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <motion.div 
      className="border rounded-2xl shadow-md !p-5 hover:shadow-lg overflow-hidden transition duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      >
      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain !mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/fallbackImg.jpg'; 
          }}
        />
      </Link>

      {/* Info */}
      <div className="flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 !mt-1 !mb-3 line-clamp-2">
          {product.description}
        </p>
        <span className="text-blue-600 font-bold text-xl">${product.price}</span>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="!mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white !px-4 !py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;
