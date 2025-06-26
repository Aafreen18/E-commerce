import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsCategory } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsCategory());
  }, [dispatch]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.categories?.map((category) => (
          <Link 
            to={`/category/${category}`} 
            key={category}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold capitalize">{category}</h2>
              <p className="text-gray-500 mt-2">Browse all {category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;