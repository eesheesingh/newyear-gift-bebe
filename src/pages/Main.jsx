import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Babe from "../assets/my-bebe.jpg";

const Main = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/product-listing');
  };

  return (
    <div className="min-h-screen flex items-center py-5">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-end justify-center">
        {/* Left side */}
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left h-full flex flex-col justify-between">
          {/* Logo at top */}
          <div className="my-3">
            <div className="flex flex-row gap-2">
              <div className="bg-[#000] px-3 py-2 rounded-[10px] flex flex-row items-center gap-2">
                <span className="text-[#fff]">Bae&apos;s</span>
                <span className="text-[#000] rounded-[20px] bg-[#fff] px-2 py-1">
                  Hub
                </span>
              </div>
            </div>
          </div>

          {/* Main content at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-gray-600 md:text-xl text-lg text-left">
              Hey, Bebe welcome to your own Gifts Hub!
            </p>
            <h1
              className="md:text-6xl text-3xl font-bold leading-tight mb-4 text-left"
              style={{ lineHeight: "1.2" }}
            >
              Happy New Year
              <br />
              Cutu Shii
            </h1>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            onClick={handleNavigate}
            className="md:inline-block text-[#fff] bg-[#000] border-[1px] border-[#000] p-2 rounded-[20px] transition-all w-fit flex items-center gap-2"
          >
            <span>Start Shopping</span>
          </motion.button>
        </div>

        {/* Right side - Image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={Babe}
            alt="Phone illustration"
            className="rounded-[15px] w-full max-w-md"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Main;
