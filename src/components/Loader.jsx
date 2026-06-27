import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-primary animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-purple-primary animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-soft-blue animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
};

export default Loader;
