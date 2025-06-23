import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
};

export default App;
