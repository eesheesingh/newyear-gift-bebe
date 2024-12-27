import React, { useState } from "react";
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX, FiHome } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const handleRemove = (productId) => {
    const result = removeFromCart(productId);
    setNotification(result);
    
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-6 z-50 p-4 rounded-lg shadow-lg ${
              notification.success ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Your Shopping Cart
      </h1>
      {cartItems.length > 0 ? (
        <div className="max-w-2xl mx-auto">
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemove(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Checkout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-4 px-4 rounded-md hover:bg-gray-900 transition duration-300 text-lg font-medium"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </motion.button>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-8">Your cart is empty.</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/product-listing')}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-900 transition duration-300 mb-4"
          >
            Continue Shopping
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/main')}
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition duration-300 flex items-center justify-center mx-auto"
          >
            <FiHome className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Cart;
