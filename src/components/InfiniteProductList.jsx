import { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByPage,
  resetPaginatedProducts,
} from '../features/products/productSlice';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const CHUNK_SIZE = 3; // how many pages per auto-scroll chunk

const InfiniteProductList = () => {
  const dispatch = useDispatch();
  const observerRef = useRef();

  const {
    paginatedItems,
    currentPage,
    hasMore,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [chunksLoaded, setChunksLoaded] = useState(1); // how many auto chunks have been unlocked

  // First fetch
  useEffect(() => {
    if (paginatedItems.length === 0) {
      dispatch(fetchProductsByPage(1));
    }

    return () => {
      dispatch(resetPaginatedProducts());
      setChunksLoaded(1);
    };
  }, [dispatch]);

  // Intersection observer for auto-load
  const lastProductRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      const maxPage = chunksLoaded * CHUNK_SIZE;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && currentPage <= maxPage) {
            dispatch(fetchProductsByPage(currentPage));
          }
        },
        {
          rootMargin: '0px 0px 300px 0px',
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [dispatch, loading, hasMore, currentPage, chunksLoaded]
  );

  // Manual load more unlocks the next chunk
  const handleLoadMoreChunk = () => {
    setChunksLoaded((prev) => prev + 1);
    if (!loading && hasMore) {
      dispatch(fetchProductsByPage(currentPage));
    }
  };

  const scrollToTop = () => {
    const anchor = document.getElementById("top-of-page");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 !p-4">
      {paginatedItems.map((product, i) => {
        const isLast = i === paginatedItems.length - 1;

        return (
          <motion.div
            key={`${product.id}-${i}`}
            ref={
              isLast &&
              currentPage <= chunksLoaded * CHUNK_SIZE &&
              hasMore
                ? lastProductRef
                : null
            }
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            className="min-h-[300px] p-2 flex"
          >
            <ProductCard product={product} />
          </motion.div>
        );
      })}

      {hasMore && currentPage > chunksLoaded * CHUNK_SIZE && (
        <div className="col-span-full flex justify-center mt-8">
          <button
            onClick={handleLoadMoreChunk}
            className="!px-5 !py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More Products
          </button>
        </div>
      )}

     {!hasMore && (
        <div className="col-span-full flex flex-col shadow-2xl items-center justify-center !p-4 !mt-8 bg-white rounded-lg border border-gray-200">
          <svg 
            className="w-10 h-10 text-gray-400 !mb-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M5 12h14M12 5l7 7-7 7" 
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 !mb-1">
            You've reached the end
          </h3>
          <p className="text-gray-500 text-center max-w-md !py-2">
            Browse other categories or scroll up to discover more products.
          </p>
          <button 
            className="!px-5 !py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={scrollToTop}
          >
            Back to Top
          </button>
        </div>
      )}

      {loading && (
        <p className="col-span-full text-center text-blue-500">Loading more...</p>
      )}

      {error && (
        <p className="col-span-full text-center text-red-500 mt-4">
          Error: {error}
        </p>
      )}
    </div>
  );
};

export default InfiniteProductList;
