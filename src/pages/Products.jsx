import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCategory } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.products);

  const categoryImages = {
    tv: "/assets/tv.jpg",
    audio: "/assets/audio.jpg",
    laptop: "/assets/laptop.jpg",
    mobile: "/assets/mobile.jpg",
    gaming: "/assets/gaming.jpg",
    appliances: "/assets/appliances.jpg"
  };

  useEffect(() => {
    dispatch(fetchProductsCategory());
  }, [dispatch]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <h1 className="text-3xl font-bold !pt-3 !px-3">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 !p-3">
        {data.categories?.map((category) => (
          <Link 
            to={`/category/${category}`} 
            key={category}
            className="bg-white rounded-lg shadow-md !p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold capitalize">{category}</h2>
              <div className="flex flex-col items-center !mt-4">
                <img
                  src={categoryImages[category]} 
                  alt={category}
                  className="w-full h-40 object-cover rounded-md !mb-3"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white !px-4 !py-2 rounded-md transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;