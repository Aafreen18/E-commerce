import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Use inView hook for each section to trigger animations when scrolled to
  const [brandRef, brandInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const [linksRef, linksInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const [socialRef, socialInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  return (
    <footer className="bg-gray-900 text-gray-300 !p-5">
      <div className="!px-6 !py-10 flex flex-col md:flex-row justify-cente md:justify-around gap-8">
        {/* Brand Info */}
        <motion.div 
          ref={brandRef}
          initial="hidden"
          animate={brandInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='text-center overflow-hidden'
        >
          <motion.h2 variants={itemVariants} className="text-xl font-bold text-white !mb-4">
            🛒 MyShop
          </motion.h2>
          <motion.p variants={itemVariants} className="text-sm overflow-hidden">
            Your one-stop shop for quality products delivered at your doorstep.
          </motion.p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          ref={linksRef}
          initial="hidden"
          animate={linksInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='text-center md:text-left'
        >
          <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white !mb-4">
            Quick Links
          </motion.h3>
          <motion.ul variants={containerVariants} className="space-y-2 overflow-hidden">
            <motion.li variants={itemVariants}>
              <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link to="/products/" className="hover:text-white transition-colors duration-300">Products</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link to="/cart" className="hover:text-white transition-colors duration-300">Cart</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link to="/checkout" className="hover:text-white transition-colors duration-300">Checkout</Link>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          ref={socialRef}
          initial="hidden"
          animate={socialInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='text-center md:text-left'
        >
          <motion.h3 variants={itemVariants} className="text-lg font-semibold text-white !mb-4">
            Follow Us
          </motion.h3>
          <motion.div 
            variants={containerVariants}
            className="flex justify-center md:justify-start gap-1 lg:gap-4 overflow-hidden"
          >
            <motion.a 
              variants={itemVariants}
              href="#" 
              className="hover:text-white transition-colors duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }}
            >
              <FaFacebook className="w-6 h-6" />
            </motion.a>
            <motion.a 
              variants={itemVariants}
              href="#" 
              className="hover:text-white transition-colors duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }}
            >
              <FaTwitter className="w-6 h-6" />
            </motion.a>
            <motion.a 
              variants={itemVariants}
              href="#" 
              className="hover:text-white transition-colors duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }}
            >
              <FaInstagram className="w-6 h-6" />
            </motion.a>
            <motion.a 
              variants={itemVariants}
              href="#" 
              className="hover:text-white transition-colors duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="text-center text-sm text-gray-300 !mt-3 border-t border-gray-700 !py-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;