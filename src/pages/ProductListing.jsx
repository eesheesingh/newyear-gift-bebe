import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Chanel from "../assets/chanel.jpg";
import Dior from "../assets/dior.jpg";
import Kbeauty from "../assets/kbeauty.jpg";
import Spehora from "../assets/sephora.jpg";
import DotKey from "../assets/Dot-_-Key-Logo.jpg";

const products = [
  {
    id: 1,
    name: "Dior",
    image: Chanel,
    description: "The Brand that you always wanted to buy, and i know how you're gonna keep it safe.",
    link: "https://www.nykaa.com/luxe/brands/dior/c/15381"
  },
  {
    id: 2,
    name: "Chanel",
    image: Dior,
    description: "The Brand You love and would love to buy you again if you'd like",
    link: "https://www.chanel.com/in/"
  },
  {
    id: 3,
    name: "Kbeauty",
    image: Kbeauty,
    description: "You already have too many of this, Thought you should get a best one",
    link: "https://www.nykaa.com/brands/kay-beauty/c/11433"
  },
  {
    id: 4,
    name: "Sephora",
    image: Spehora,
    description: "Ofcourse anything you's like in Rare Beauty, Choose The One You Love",
    link: "https://www.sephora.com/search?keyword=rare%20beauty"
  },
  {
    id: 5,
    name: "Dot & Key",
    image: DotKey,
    description: "AnyThing You Need, You can get it from Dot & Key, Let Me Know",
    link: "https://www.nykaa.com/brands/dot-key/c/7675"
  },
];

const ProductListing = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const [notification, setNotification] = useState(null);

  const handleAddToCart = (product) => {
    const result = addToCart(product);
    
    // Show notification
    setNotification(result);
    
    // Clear notification after 2 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative">
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
          onClick={() => navigate('/main')}
          className="bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <FiArrowLeft className="w-6 h-6" />
        </motion.button>
      </motion.div>

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

      {/* Cart Button */}
      <motion.div 
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/cart')}
          className="bg-black text-white p-4 rounded-full relative shadow-lg"
        >
          <FiShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
            >
              {cartItems.length}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      <div className="container mx-auto py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 uppercase tracking-widest mb-4"
          >
            Your Favorite Brands
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            New Year Special For You, You can Choose Two
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-80 h-1 bg-black mx-auto"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 px-6 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-6 h-[400px]">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="md:text-3xl text-xl font-bold text-gray-900">
                    {product.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    cartItems.some(item => item.id === product.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : cartItems.length >= 2
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-900'
                  } text-white`}
                  disabled={cartItems.some(item => item.id === product.id) || cartItems.length >= 2}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>
                    {cartItems.some(item => item.id === product.id)
                      ? 'Already in Cart'
                      : cartItems.length >= 2
                      ? 'Cart Full'
                      : 'Add to Cart'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
