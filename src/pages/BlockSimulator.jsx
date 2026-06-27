import React, { useState, useEffect } from 'react';
import Block from '../components/Block';
import { calculateHash } from '../utils/blockchain';
import { motion } from 'framer-motion';
import { Link2, AlertTriangle, Info } from 'lucide-react';

const BlockSimulator = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize the genesis block and a second block
  useEffect(() => {
    const initBlocks = async () => {
      setIsLoading(true);
      const timestamp = 1700000000000; // Fixed timestamp for initial fast-load if desired, or dynamic
      
      const previousHash1 = '0000000000000000000000000000000000000000000000000000000000000000';
      let nonce1 = 0;
      let hash1 = '';
      while (true) {
        hash1 = await calculateHash(1, previousHash1, timestamp, 'Genesis Block', nonce1);
        if (hash1.startsWith('00')) break;
        nonce1++;
      }
      
      const genesisBlock = {
        index: 1,
        timestamp,
        data: 'Genesis Block',
        previousHash: previousHash1,
        hash: hash1,
        nonce: nonce1
      };

      const previousHash2 = hash1;
      let nonce2 = 0;
      let hash2 = '';
      while (true) {
        hash2 = await calculateHash(2, previousHash2, timestamp + 1000, '', nonce2);
        if (hash2.startsWith('00')) break;
        nonce2++;
      }

      const block2 = {
        index: 2,
        timestamp: timestamp + 1000,
        data: '',
        previousHash: previousHash2,
        hash: hash2,
        nonce: nonce2
      };

      setBlocks([genesisBlock, block2]);
      setIsLoading(false);
    };

    initBlocks();
  }, []);

  const updateBlock = async (index, newBlockData) => {
    const newBlocks = [...blocks];
    newBlocks[index] = newBlockData;
    
    // Ripple effect: update previous hashes for all subsequent blocks
    for (let i = index + 1; i < newBlocks.length; i++) {
      const prevBlock = newBlocks[i - 1];
      newBlocks[i].previousHash = prevBlock.hash;
      
      // Recalculate hash for this block since previous hash changed
      newBlocks[i].hash = await calculateHash(
        newBlocks[i].index,
        newBlocks[i].previousHash,
        newBlocks[i].timestamp,
        newBlocks[i].data,
        newBlocks[i].nonce
      );
    }
    
    setBlocks(newBlocks);
  };

  // Check if chain is valid at a specific index
  const isChainValidUpto = (index) => {
    for (let i = 1; i <= index; i++) {
      const currentBlock = blocks[i];
      const previousBlock = blocks[i - 1];
      
      if (currentBlock.previousHash !== previousBlock.hash) return false;
      if (!previousBlock.hash.startsWith('00')) return false; // Prev block must be mined
    }
    return true;
  };

  const isChainBroken = blocks.length > 1 && (!blocks[0].hash.startsWith('00') || !isChainValidUpto(blocks.length - 1));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Block <span className="gradient-text">Simulator</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Experience how Proof-of-Work mining creates an immutable chain. 
            Mine a block to find a hash starting with "00".
          </motion.p>
        </div>

        {isChainBroken && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel border-red-500/50 bg-red-500/10 p-4 mb-8 flex items-center justify-center gap-3 text-red-400 max-w-2xl mx-auto"
          >
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <p className="font-medium">Chain Broken! If you change data in an earlier block, you must re-mine it and all subsequent blocks.</p>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 mb-16 overflow-x-auto pb-8">
          {!isLoading && blocks.map((block, index) => (
            <React.Fragment key={block.index}>
              <div className="w-full lg:w-[450px] shrink-0">
                <Block 
                  block={block} 
                  index={index} 
                  updateBlock={updateBlock} 
                  isChainValid={index === 0 ? true : isChainValidUpto(index)} 
                />
              </div>
              
              {index < blocks.length - 1 && (
                <div className="flex justify-center shrink-0">
                  <motion.div 
                    animate={!isChainValidUpto(index + 1) ? { x: [0, -5, 5, -5, 5, 0] } : { x: [0, 5, 0] }}
                    transition={!isChainValidUpto(index + 1) ? { duration: 0.5, repeat: Infinity, repeatType: "reverse" } : { repeat: Infinity, duration: 2 }}
                    className="rotate-90 lg:rotate-0"
                  >
                    <Link2 className={`w-8 h-8 ${!isChainValidUpto(index + 1) ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-cyan-500/50 drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]'}`} />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Explanations Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 border-slate-700/50">
            <h4 className="text-xl font-bold mb-3 flex items-center gap-2 text-cyan-400">
              <Info className="w-5 h-5" /> Hash & Nonce
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A <strong>Hash</strong> is a unique digital fingerprint of data. In this simulator, we use the SHA-256 algorithm.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              The <strong>Nonce</strong> (Number used ONCE) is a variable the miner changes to guess a hash that meets the difficulty target (e.g., starting with "00").
            </p>
          </div>
          
          <div className="glass-panel p-6 border-slate-700/50">
            <h4 className="text-xl font-bold mb-3 flex items-center gap-2 text-purple-400">
              <Info className="w-5 h-5" /> Immutability & Proof of Work
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              <strong>Proof of Work</strong> requires computational effort (mining) to find the correct nonce, preventing spam and securing the network.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              <strong>Chain Integrity:</strong> Each block contains the previous block's hash. Changing past data breaks all subsequent hashes, making it obvious the chain was tampered with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSimulator;
