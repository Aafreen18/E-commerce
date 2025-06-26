import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="p-6 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty.</h2>
        <p>Please add some products before checkout.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you could integrate with payment API or backend

    setSubmitted(true);
    dispatch(clearCart());
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
        <p className="mb-4">Thank you, {formData.name}, for your purchase.</p>
        <p>We will send a confirmation email to <strong>{formData.email}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          ></textarea>
        </div>

        <div className="text-right font-bold text-xl">
          Total: ${totalPrice.toFixed(2)}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
