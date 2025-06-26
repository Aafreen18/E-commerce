import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProductsByCategory } from '../features/products/productSlice';

const ProductsByCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.categories?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/product/${product.id}`}>
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-48 object-contain p-4"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;