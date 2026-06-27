import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const CryptoCard = ({ coin, index }) => {
  const isPositive = (coin?.usd_24h_change || 0) >= 0;
  const prevPriceRef = useRef(coin?.usd || 0);
  const controls = useAnimation();
  const [flashColor, setFlashColor] = useState('transparent');

  useEffect(() => {
    if (coin?.usd && prevPriceRef.current !== coin.usd) {
      const isUp = coin.usd > prevPriceRef.current;
      setFlashColor(isUp ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)');
      
      controls.start({
        backgroundColor: [isUp ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', 'rgba(30, 41, 59, 0.5)'],
        transition: { duration: 1.5, ease: "easeOut" }
      });
      
      prevPriceRef.current = coin.usd;
    } else {
      controls.set({ backgroundColor: 'rgba(30, 41, 59, 0.5)' });
    }
  }, [coin?.usd, controls]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={controls}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(6,182,212,0.3)' }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="glass-card p-6 relative overflow-hidden group border border-slate-700/50"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] group-hover:bg-cyan-500/10 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center p-2 border border-slate-700">
             {/* Using simple placeholder letters for logos as we don't have images */}
             <span className="text-xl font-bold text-slate-300">{coin?.name?.charAt(0) || '?'}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{coin?.name || 'Unknown'}</h3>
            <p className="text-sm text-slate-400 uppercase">{coin?.id || '---'}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(coin?.usd_24h_change || 0).toFixed(2)}%
        </div>
      </div>
      
      <div>
        <p className="text-slate-400 text-sm mb-1">Current Price</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            <AnimatedCounter value={coin?.usd || 0} prefix="$" decimal={(coin?.usd || 0) < 1 ? 6 : 2} />
          </span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm text-slate-400">
        <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> 24h Volatility</span>
        <span>{isPositive ? 'Bullish' : 'Bearish'} Trend</span>
      </div>
    </motion.div>
  );
};

export default CryptoCard;
