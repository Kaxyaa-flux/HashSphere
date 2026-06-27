import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="glass-card p-6 flex flex-col items-center text-center group cursor-pointer"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 border border-slate-700/50 group-hover:border-cyan-500/50 transition-colors">
        <Icon className="w-8 h-8 text-cyan-primary group-hover:text-purple-400 transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
