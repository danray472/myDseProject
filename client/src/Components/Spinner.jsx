import React from 'react';
import { motion } from 'framer-motion';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="premium-ping-loader">
        {/* Expanding rings */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="ping-circle"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: [1, 2.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
        {/* Solid Core */}
        <motion.div
          className="ping-core"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Spinner;