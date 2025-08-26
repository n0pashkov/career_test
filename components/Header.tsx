'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="relative w-24 h-24">
              <Image
                src="/logo-it.png"
                alt="IT-CUBE Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">
                IT-CUBE
              </h1>
              <p className="text-sm text-gray-600">
                Школа 475
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
