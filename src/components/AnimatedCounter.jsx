import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "", prefix = "", decimal = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
    restDelta: 0.001
  });

  const displayValue = useTransform(springValue, (current) => {
    return prefix + current.toFixed(decimal) + suffix;
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <motion.span ref={ref} className="font-mono">
      {displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;
