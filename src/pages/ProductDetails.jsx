import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((item) => item.id.toString() === id)
  );

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      {/* Image */}
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto max-h-[500px] object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <span className="text-2xl text-blue-600 font-bold">${product.price}</span>

        <div className="mt-6">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
