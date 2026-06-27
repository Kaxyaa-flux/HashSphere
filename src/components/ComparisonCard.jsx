import React from 'react';
import { motion } from 'framer-motion';

const ComparisonCard = ({ title, leftTitle, leftItems, rightTitle, rightItems, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card overflow-hidden"
    >
      <div className="bg-slate-800/50 p-4 border-b border-slate-700/50 flex items-center gap-3">
        {Icon && <Icon className="text-cyan-400 w-6 h-6" />}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
        <div className="p-6 hover:bg-slate-800/30 transition-colors">
          <h4 className="text-lg font-semibold mb-4 text-cyan-300">{leftTitle}</h4>
          <ul className="space-y-3">
            {leftItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-cyan-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 hover:bg-slate-800/30 transition-colors">
          <h4 className="text-lg font-semibold mb-4 text-purple-300">{rightTitle}</h4>
          <ul className="space-y-3">
            {rightItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-purple-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
