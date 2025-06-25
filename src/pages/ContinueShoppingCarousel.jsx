import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { fetchProducts } from '../features/products/productSlice';

const ContinueShoppingCarousel = () => {
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.products);
  const products = data?.products || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = window.innerWidth < 640 ? 1 : 3;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleCount) % products.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - visibleCount + products.length) % products.length
    );
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(products[(currentIndex + i) % products.length]);
    }
    return visible;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-8 text-red-500">
      Error loading products: {error}
    </div>
  );

  if (products.length === 0) return (
    <div className="text-center py-8 text-gray-500">
      No products available
    </div>
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Continue Shopping
      </h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:scale-110 transition"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow hover:scale-110 transition"
          aria-label="Next"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden !w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex gap-6"
            >
              {getVisibleProducts().map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 bg-white w-full sm:w-1/3 rounded-xl shadow-md overflow-hidden flex flex-col"
                  style={{ minHeight: '420px' }}
                >
                
                  {/* Image */}
                  <div className="h-56 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {product.brand} • {product.model} • {product.color}
                      </p>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContinueShoppingCarousel;
