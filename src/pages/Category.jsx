import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { fetchProductsByCategory } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';

const ProductsByCategory = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);

  console.log(data)

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold !ms-5 !pt-3 capitalize" style={{overflowY:'hidden'}}>{category}</h2>

      {loading && <p className='!ms-5 !pt-3'>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 !m-5">
        {data.products?.map((product) => (
          <ProductCard key={product.id} product={product}  />
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;