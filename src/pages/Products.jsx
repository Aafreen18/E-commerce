import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCategory } from '../features/products/productSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import tvImg from '../assets/tv.jpg';
import audioImg from '../assets/audio.jpg';
import laptopImg from '../assets/laptop.jpg';
import mobileImg from '../assets/mobile.jpg';
import gamingImg from '../assets/gaming.jpg';
import appliancesImg from '../assets/appliances.jpg';

const Products = () => {
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.products);

  const categoryImages = {
    tv: tvImg,
    audio: audioImg,
    laptop: laptopImg,
    mobile: mobileImg,
    gaming: gamingImg,
    appliances: appliancesImg
  };

  useEffect(() => {
    dispatch(fetchProductsCategory());
  }, [dispatch]);

  if (loading) return <div className="text-center !py-10 text-lg">Loading categories...</div>;
  if (error) return <div className="text-center text-red-600 !py-10">Error: {error}</div>;
  if (!data?.categories) return <div className="text-center !py-10">No categories found</div>;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 !px-3 !py-3">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden !px-3 !py-5">
        {data.categories?.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className='shadow-2xl'
          >
            <Link
              to={`/products/category/${category}`}
              className="block bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden group relative"
            >
              <div className="relative w-full h-90 overflow-hidden">
                <img
                  src={categoryImages[category.toLowerCase()]}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <motion.button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white !px-5 !py-2 rounded-full shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  Shop Now
                </motion.button>
              </div>
              <div className="!p-4 text-center">
                <h2 className="text-xl font-semibold capitalize text-gray-800">
                  {category}
                </h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
