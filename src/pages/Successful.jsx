import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Successful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Successful!</h1>
        <p className="text-lg text-gray-700 mb-6">Thank you for your purchase! Your order has been successfully processed.</p>
        <p className="text-sm text-gray-500">You will be redirected to the main page shortly.</p>
      </motion.div>
    </div>
  );
};

export default Successful;
