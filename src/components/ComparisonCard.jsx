import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ComparisonCard = ({ title, leftTitle, leftItems, rightTitle, rightItems, icon: Icon, delay = 0, learnMoreText = "Learn more about this concept." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card overflow-hidden group"
    >
      <div className="bg-theme-card/50 p-4 border-b border-slate-700/50 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3">
          {Icon && (
            <motion.div whileHover={{ rotate: 180, scale: 1.2 }} transition={{ duration: 0.3 }}>
              <Icon className="text-cyan-400 w-6 h-6" />
            </motion.div>
          )}
          <h3 className="text-xl font-bold group-hover:text-cyan-300 transition-colors">{title}</h3>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-theme-muted group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </div>
      
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/50">
        <div className="p-6 hover:bg-theme-card/30 transition-colors">
          <h4 className="text-lg font-semibold mb-4 text-cyan-300">{leftTitle}</h4>
          <ul className="space-y-3">
            {leftItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-theme-muted">
                <span className="text-cyan-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 hover:bg-theme-card/30 transition-colors">
          <h4 className="text-lg font-semibold mb-4 text-purple-300">{rightTitle}</h4>
          <ul className="space-y-3">
            {rightItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-theme-muted">
                <span className="text-purple-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-theme-surface/80 border-t border-slate-700/50"
          >
            <div className="p-6 text-sm text-theme-muted leading-relaxed border-b border-slate-700/50 bg-gradient-to-r from-cyan-900/10 to-purple-900/10">
              {learnMoreText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ComparisonCard;
