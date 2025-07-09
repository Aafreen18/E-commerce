import InfiniteProductList from '../components/InfiniteProductList';

const Home = () => {
  
  return (
    <>
      <div className="w-full mx-auto px-6 py-10 min-h-screen" id="top-of-page">
        <h2 className="text-3xl font-bold !ms-5 !pt-3" style={{overflowY:'hidden'}}>Featured Products</h2>

        <InfiniteProductList />
      </div>

      
    </>
  );
};

export default Home;
