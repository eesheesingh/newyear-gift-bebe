import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FiArrowLeft, FiExternalLink, FiSave } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [links, setLinks] = useState({});
  const [notification, setNotification] = useState(null);

  const handleLinkChange = (itemId, value) => {
    setLinks(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const handleSaveToFile = () => {
    const fileContent = cartItems.map(item => {
      const userLink = links[item.id] || 'No user link provided';
      return `Brand: ${item.name}\nOriginal Link: ${item.link}\nUser Link: ${userLink}\n\n`;
    }).join('');

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gift_preferences.txt';
    a.click();
    URL.revokeObjectURL(url);

    setNotification({
      type: 'success',
      message: 'Your gift preferences have been saved as a file!'
    });

    setTimeout(() => {
      navigate('/successful');
    }, 2000);
  };

  return (
    <div className="min-h-screen relative p-6">
      {/* Back Button */}
      <motion.div 
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cart')}
          className="bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <FiArrowLeft className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </motion.div>
      )}

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Your Selected Brands
          </h1>
          
          <p className="text-gray-600 text-center mb-8">
            Please paste your preferred product links below
          </p>

          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {item.name}
                        </h2>
                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                        >
                          Visit Store <FiExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paste your preferred product link
                    </label>
                    <input
                      type="url"
                      value={links[item.id] || ''}
                      onChange={(e) => handleLinkChange(item.id, e.target.value)}
                      placeholder="https://"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveToFile}
            className="w-full mt-8 bg-black text-white py-4 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <FiSave className="w-5 h-5" />
            <span>Save Your Gift</span>
          </motion.button>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Make sure to paste the correct product links! 🎁
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
