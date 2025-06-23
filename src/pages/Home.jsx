import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../features/products/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold !ms-5 !pt-3" style={{overflowY:'hidden'}}>Featured Products</h2>

      {loading && <p className='!ms-5 !pt-3'>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !m-5">
        {products.products?.map((product) => (
          <ProductCard key={product.id} product={product}  />
        ))}
      </div>
    </div>
  );
};

export default Home;
