import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

const FloatingSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-80 glass-card p-4 mb-2 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-3">
              <h4 className="font-bold font-space">HashSphere Support</h4>
              <button onClick={() => setIsOpen(false)} className="text-theme-muted hover:text-theme-text transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-theme-muted mb-4">Hello! How can we help you explore the blockchain today?</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type your question..." 
                className="w-full bg-theme-surface/50 border border-slate-700/50 rounded-lg p-2 text-sm text-theme-text focus:outline-none focus:border-cyan-500/50"
              />
              <button className="gradient-bg px-3 rounded-lg text-theme-text font-medium hover:opacity-90">
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-theme-text shadow-[0_0_20px_rgba(37,99,235,0.4)]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingSupport;
