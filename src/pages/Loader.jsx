import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-white dark:bg-black"></div>
        <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-blue-500">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
