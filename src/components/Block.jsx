import React, { useState, useEffect, useCallback } from 'react';
import { calculateHash } from '../utils/blockchain';
import { motion } from 'framer-motion';
import { Cpu, AlertTriangle, CheckCircle2, Wallet, MessageSquare, DollarSign } from 'lucide-react';
import { saveMinedBlock } from '../services/api';
import toast from 'react-hot-toast';

const Block = ({ block, index, updateBlock, isChainValid, difficulty = '00' }) => {
  const [isMining, setIsMining] = useState(false);
  const [miningTime, setMiningTime] = useState(0);

  const [miningProgress, setMiningProgress] = useState(0);

  // Determine if block is valid based on hash starting with current difficulty and chain validity
  const isValid = block.hash.startsWith(difficulty) && (index === 0 || isChainValid);

  // Shake animation for invalid block
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    opacity: 1,
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
      
      if (computedHash.startsWith(difficulty)) {
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

  const handleTxChange = async (field, value) => {
    const newTx = { ...txData, [field]: value };
    const newDataStr = JSON.stringify(newTx);
    
    const newHash = await calculateHash(
      block.index,
      block.previousHash,
      block.timestamp,
      newDataStr,
      block.nonce
    );
    
    updateBlock(index, {
      ...block,
      data: newDataStr,
      hash: newHash
    });
  };

  let txData = { sender: '', receiver: '', amount: '', currency: 'ETH', message: '' };
  try {
    const parsed = JSON.parse(block.data);
    if (typeof parsed === 'object' && parsed !== null) {
      txData = { ...txData, ...parsed };
    } else {
      txData.message = block.data;
    }
  } catch (e) {
    txData.message = block.data;
  }

  const isFormValid = txData.sender.trim() !== '' && txData.receiver.trim() !== '' && txData.amount !== '';

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
        <div className="space-y-3 bg-theme-surface/30 p-4 rounded-xl border border-theme-border">
          <h4 className="text-sm font-bold text-soft-blue flex items-center gap-2 mb-2">
            Transaction Details
          </h4>
          
          <div>
            <label className="text-xs text-theme-muted mb-1 flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Sender Wallet Address
            </label>
            <input
              type="text"
              value={txData.sender}
              onChange={(e) => handleTxChange('sender', e.target.value)}
              placeholder="0xA1B2...C3D4"
              className="w-full bg-theme-surface/50 border border-theme-border rounded-lg p-2 text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-soft-blue font-mono"
            />
          </div>

          <div>
            <label className="text-xs text-theme-muted mb-1 flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Receiver Wallet Address
            </label>
            <input
              type="text"
              value={txData.receiver}
              onChange={(e) => handleTxChange('receiver', e.target.value)}
              placeholder="0x9F8E...1A2B"
              className="w-full bg-theme-surface/50 border border-theme-border rounded-lg p-2 text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-soft-blue font-mono"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-theme-muted mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Amount
              </label>
              <input
                type="number"
                value={txData.amount}
                onChange={(e) => handleTxChange('amount', e.target.value)}
                placeholder="0.00"
                className="w-full bg-theme-surface/50 border border-theme-border rounded-lg p-2 text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-soft-blue font-mono"
              />
            </div>
            <div className="w-24">
              <label className="text-xs text-theme-muted mb-1">Asset</label>
              <select
                value={txData.currency}
                onChange={(e) => handleTxChange('currency', e.target.value)}
                className="w-full bg-theme-surface/50 border border-theme-border rounded-lg p-2 text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-soft-blue font-bold"
              >
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="SOL">SOL</option>
                <option value="ARB">ARB</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-theme-muted mb-1 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Optional Message
            </label>
            <textarea
              value={txData.message}
              onChange={(e) => handleTxChange('message', e.target.value)}
              maxLength={200}
              placeholder="Payment for NFT..."
              className="w-full bg-theme-surface/50 border border-theme-border rounded-lg p-2 text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-soft-blue resize-none h-16"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-theme-muted mb-1">Previous Hash</label>
          <input
            type="text"
            value={block.previousHash}
            readOnly
            className="w-full bg-theme-surface/80 border border-slate-700 rounded-lg p-3 text-theme-muted font-mono text-xs overflow-hidden text-ellipsis"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-theme-muted mb-1">Nonce</label>
            <input
              type="text"
              value={block.nonce}
              readOnly
              className="w-full bg-theme-surface/80 border border-slate-700 rounded-lg p-3 text-theme-muted font-mono"
            />
          </div>
          <div>
            <label className="block text-sm text-theme-muted mb-1">Mining Time</label>
            <input
              type="text"
              value={miningTime > 0 ? `${miningTime}s` : '-'}
              readOnly
              className="w-full bg-theme-surface/80 border border-slate-700 rounded-lg p-3 text-theme-muted font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-theme-muted mb-1">Hash</label>
          <input
            type="text"
            value={block.hash}
            readOnly
            className={`w-full bg-theme-surface/80 border rounded-lg p-3 font-mono text-xs transition-colors duration-300 ${
              isValid ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/50'
            }`}
          />
        </div>

        <button
          onClick={mine}
          disabled={isMining || isValid || !isFormValid}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isMining || !isFormValid
              ? 'bg-theme-surface border border-theme-border text-theme-muted cursor-not-allowed opacity-70' 
              : isValid 
                ? 'bg-green-600/20 text-green-500 cursor-not-allowed border border-green-500/30'
                : 'gradient-bg text-theme-text hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
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
