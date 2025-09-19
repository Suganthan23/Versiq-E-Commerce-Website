import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Preloader = () => {
  const brandName = "Versiq".split(""); 

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="font-logo text-4xl md:text-5xl font-semibold text-primary"
        aria-label="Versiq" 
      >
        {brandName.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

export default Preloader;