import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { ShoppingBag, CheckCircle, CreditCard, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center !p-4">
        <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg !p-8">
          <div className="w-20 h-20 mx-auto !mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 !mb-4">Your cart is empty</h2>
          <p className="text-gray-600 !mb-6">Add some amazing products to get started with your order.</p>
          <Link to="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-3 rounded-lg font-semibold transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    //Payment Api Calls
    
    setSubmitted(true);
    setLoading(false);
    dispatch(clearCart());
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center !p-4">
        <div className="max-w-lg w-full text-center bg-white rounded-xl shadow-lg !p-8">
          <div className="w-20 h-20 mx-auto !mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 overflow-hidden">Order Confirmed!</h2>
          <p className="text-gray-600 !mb-2">Thank you, <span className="font-semibold text-gray-900">{formData.name}</span>, for your purchase.</p>
          <p className="text-gray-600 !mb-6">
            We'll send a confirmation email to{' '}
            <span className="font-semibold text-blue-600">{formData.email}</span>
          </p>
          
          <div className="bg-blue-50 rounded-lg !p-4 !mb-6">
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>2-3 days delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-3 rounded-lg font-semibold transition-colors">
            Track Your Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 !py-6 lg:py-12">
      <div className="max-w-4xl mx-auto !px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 !p-6">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8 text-white" />
                  <h2 className="text-2xl font-bold text-white">Checkout</h2>
                </div>
                <p className="text-blue-100 !mt-2">Complete your order with secure payment</p>
              </div>
              
              <div className="!p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 !mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-lg !px-4 !py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 !mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-lg !px-4 !py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-semibold text-gray-900 !mb-2">
                        Shipping Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-lg !px-4 !py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors resize-none"
                        rows={4}
                        placeholder="Enter your complete shipping address..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="!mt-8 !pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white !py-4 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Confirm Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gray-900 !p-6">
                <h3 className="text-xl font-bold text-white">Order Summary</h3>
              </div>
              
              <div className="!p-6">
                <div className="space-y-4">
                  {items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">Item {index + 1}</p>
                        <p className="text-gray-500 text-xs">Qty: 1</p>
                      </div>
                      <p className="font-semibold text-gray-900">$99</p>
                    </div>
                  ))}
                  
                  {items.length > 3 && (
                    <div className="text-center !py-2">
                      <p className="text-gray-500 text-sm">+ {items.length - 3} more items</p>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 !mt-6 !pt-6 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${(totalPrice * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${(totalPrice * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 !pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="!mt-6 !p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800 text-sm">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-blue-700 text-xs !mt-1">Your payment information is protected with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;