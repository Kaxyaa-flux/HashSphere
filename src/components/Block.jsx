import React, { useState, useEffect, useCallback } from 'react';
import { calculateHash } from '../utils/blockchain';
import { motion } from 'framer-motion';
import { Cpu, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { saveMinedBlock } from '../services/api';
import toast from 'react-hot-toast';

const Block = ({ block, index, updateBlock, isChainValid }) => {
  const [isMining, setIsMining] = useState(false);
  const [miningTime, setMiningTime] = useState(0);

  const [miningProgress, setMiningProgress] = useState(0);

  // Determine if block is valid based on hash starting with "00" and chain validity
  const isValid = block.hash.startsWith('00') && (index === 0 || isChainValid);

  // Shake animation for invalid block
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 }
  };

  const mine = async () => {
    setIsMining(true);
    const startTime = performance.now();
    setMiningProgress(0);
    
    let currentNonce = 0;
    let computedHash = '';
    
    // Simulate mining by incrementing nonce until hash starts with '00'
    // To prevent UI blocking we use a small timeout loop, though Web Crypto is async anyway
    const mineStep = async () => {
      computedHash = await calculateHash(
        block.index, 
        block.previousHash, 
        block.timestamp, 
        block.data, 
        currentNonce
      );
      
      if (computedHash.startsWith('00')) {
        const endTime = performance.now();
        setMiningTime(((endTime - startTime) / 1000).toFixed(2));
        
        const updatedBlockData = {
          ...block,
          nonce: currentNonce,
          hash: computedHash
        };
        updateBlock(index, updatedBlockData);
        setIsMining(false);
        setMiningProgress(100);
        
        // Save to backend
        try {
          await saveMinedBlock(updatedBlockData);
          toast.success(`Block #${block.index} saved to backend!`, { id: `mine-${block.index}` });
        } catch (error) {
          toast.error(`Failed to save block #${block.index}`);
        }
      } else {
        currentNonce++;
        // Use setTimeout to yield to main thread every 500 hashes
        if (currentNonce % 500 === 0) {
          setMiningProgress(prev => Math.min(prev + (100 / 20), 95)); // Fake progress up to 95%
          setTimeout(mineStep, 0);
        } else {
          mineStep();
        }
      }
    };
    
    mineStep();
  };

  const handleDataChange = async (e) => {
    const newData = e.target.value;
    const newHash = await calculateHash(
      block.index,
      block.previousHash,
      block.timestamp,
      newData,
      block.nonce
    );
    
    updateBlock(index, {
      ...block,
      data: newData,
      hash: newHash
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={!isValid && block.data !== "" ? shakeAnimation : { opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`glass-card p-6 border-2 transition-all duration-300 relative overflow-hidden ${
        isValid ? 'border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
      } ${isMining ? 'animate-pulse border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''}`}
    >
      {isMining && (
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300" style={{ width: `${miningProgress}%` }}></div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold font-mono">Block #{block.index}</h3>
        {isValid ? (
          <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" /> Valid
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-400 bg-red-500/10 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            <AlertTriangle className="w-4 h-4" /> Invalid
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Data</label>
          <textarea
            value={block.data}
            onChange={handleDataChange}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono resize-none h-24"
            placeholder="Enter block data..."
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Previous Hash</label>
          <input
            type="text"
            value={block.previousHash}
            readOnly
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-400 font-mono text-xs overflow-hidden text-ellipsis"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Nonce</label>
            <input
              type="text"
              value={block.nonce}
              readOnly
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Mining Time</label>
            <input
              type="text"
              value={miningTime > 0 ? `${miningTime}s` : '-'}
              readOnly
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-slate-300 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Hash</label>
          <input
            type="text"
            value={block.hash}
            readOnly
            className={`w-full bg-slate-900/80 border rounded-lg p-3 font-mono text-xs transition-colors duration-300 ${
              isValid ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/50'
            }`}
          />
        </div>

        <button
          onClick={mine}
          disabled={isMining || isValid}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isMining 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : isValid 
                ? 'bg-green-600/20 text-green-500 cursor-not-allowed border border-green-500/30'
                : 'gradient-bg text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
          }`}
        >
          {isMining ? (
            <>
              <Cpu className="w-5 h-5 animate-pulse" /> Mining...
            </>
          ) : isValid ? (
            <>
              <CheckCircle2 className="w-5 h-5" /> Mined
            </>
          ) : (
            <>
              <Cpu className="w-5 h-5" /> Mine Block
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Block;
