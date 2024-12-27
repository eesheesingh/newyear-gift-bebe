import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Add a small delay for the exit animation to complete
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }, 4000); // Reduced to 4s to accommodate exit animation

    return () => clearTimeout(timer);
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const signatureVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 2,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden px-4">
      <AnimatePresence>
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? 'exit' : 'visible'}
        >
          <motion.div variants={containerVariants} className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Made', 'With', 'Love', 'For', 'You', 'Bae'].map((word, index) => (
              <motion.h1
                key={index}
                variants={wordVariants}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-black inline-block"
              >
                {word}
              </motion.h1>
            ))}
          </motion.div>

          <motion.span
            variants={signatureVariants}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl md:text-2xl text-gray-600 mt-4 italic"
          >
            - Eeshee
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
