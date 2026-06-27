import React, { useState, useEffect } from 'react';
import Block from '../components/Block';
import { calculateHash } from '../utils/blockchain';
import { motion } from 'framer-motion';
import { Link2, AlertTriangle, Info } from 'lucide-react';

const BlockSimulator = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('00');

  // Initialize the genesis block and a second block
  useEffect(() => {
    const initBlocks = async () => {
      setIsLoading(true);
      const timestamp = 1700000000000;
      
      const previousHash1 = '0000000000000000000000000000000000000000000000000000000000000000';
      const initialTx1 = JSON.stringify({ sender: '0x0000...0000', receiver: '0x1A2B...3C4D', amount: 100, currency: 'ETH', message: 'Genesis Transaction' });
      let nonce1 = 0;
      let hash1 = '';
      while (true) {
        hash1 = await calculateHash(1, previousHash1, timestamp, initialTx1, nonce1);
        if (hash1.startsWith(difficulty)) break;
        nonce1++;
      }
      
      const genesisBlock = {
        index: 1,
        timestamp,
        data: initialTx1,
        previousHash: previousHash1,
        hash: hash1,
        nonce: nonce1
      };

      const previousHash2 = hash1;
      const initialTx2 = JSON.stringify({ sender: '', receiver: '', amount: '', currency: 'ETH', message: '' });
      let nonce2 = 0;
      let hash2 = '';
      while (true) {
        hash2 = await calculateHash(2, previousHash2, timestamp + 1000, initialTx2, nonce2);
        if (hash2.startsWith(difficulty)) break;
        nonce2++;
      }

      const block2 = {
        index: 2,
        timestamp: timestamp + 1000,
        data: initialTx2,
        previousHash: previousHash2,
        hash: hash2,
        nonce: nonce2
      };

      setBlocks([genesisBlock, block2]);
      setIsLoading(false);
    };

    initBlocks();
  }, [difficulty]);

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
      if (!previousBlock.hash.startsWith(difficulty)) return false; // Prev block must be mined
    }
    return true;
  };

  const isChainBroken = blocks.length > 1 && (!blocks[0].hash.startsWith(difficulty) || !isChainValidUpto(blocks.length - 1));

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
            className="text-theme-muted text-lg max-w-2xl mx-auto"
          >
            Experience how Proof-of-Work mining creates an immutable chain. 
            <div className="flex flex-col items-center justify-center mt-6">
              <label className="text-theme-muted text-sm mb-2 font-medium">Select Mining Difficulty</label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-theme-surface/80 border border-theme-border rounded-lg px-4 py-2 text-theme-text focus:outline-none focus:ring-2 focus:ring-soft-blue/50"
              >
                <option value="00">Easy (Hash starts with '00')</option>
                <option value="000">Medium (Hash starts with '000')</option>
                <option value="0000">Hard (Hash starts with '0000')</option>
              </select>
              <p className="text-theme-muted text-xs mt-2">Higher difficulty takes exponentially longer to mine.</p>
            </div>
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
                  difficulty={difficulty}
                />
              </div>
              
              {index < blocks.length - 1 && (
                <div className="flex justify-center shrink-0">
                  <motion.div 
                    animate={!isChainValidUpto(index + 1) ? { x: [0, -5, 5, -5, 5, 0] } : { x: [0, 5, 0] }}
                    transition={!isChainValidUpto(index + 1) ? { duration: 0.5, repeat: Infinity, repeatType: "reverse" } : { repeat: Infinity, duration: 2 }}
                    className="rotate-90 lg:rotate-0"
                  >
                    <Link2 className={`w-8 h-8 ${!isChainValidUpto(index + 1) ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-soft-blue drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Educational Explanations Section */}
        <div className="max-w-5xl mx-auto mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-center mb-8">Blockchain Concepts Explained</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-6 border-theme-border hover:-translate-y-1 transition-transform">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-soft-blue">
                What is a Transaction?
              </h4>
              <p className="text-theme-muted text-sm leading-relaxed">
                A transaction is the transfer of value or data between two parties on the blockchain. It typically contains the sender's wallet address, the receiver's address, the amount transferred, and sometimes an optional message.
              </p>
            </div>

            <div className="glass-panel p-6 border-theme-border hover:-translate-y-1 transition-transform">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-soft-blue">
                What is a Hash?
              </h4>
              <p className="text-theme-muted text-sm leading-relaxed">
                A Hash is a unique digital fingerprint of the data. Even changing a single character in the transaction completely changes the resulting hash, making tampering immediately obvious.
              </p>
            </div>

            <div className="glass-panel p-6 border-theme-border hover:-translate-y-1 transition-transform">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-soft-blue">
                What is a Nonce?
              </h4>
              <p className="text-theme-muted text-sm leading-relaxed">
                The Nonce ("Number used once") is a random number that miners continually guess and increment. The goal is to find a nonce that, when hashed with the block's data, produces a hash starting with the required number of zeros.
              </p>
            </div>

            <div className="glass-panel p-6 border-theme-border hover:-translate-y-1 transition-transform lg:col-span-1 md:col-span-2">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-purple-primary">
                What is Proof of Work?
              </h4>
              <p className="text-theme-muted text-sm leading-relaxed">
                Proof of Work is the consensus mechanism where miners compete to solve a cryptographic puzzle (finding the correct nonce). The higher the difficulty (more leading zeros required), the exponentially harder and longer it takes to mine the block.
              </p>
            </div>

            <div className="glass-panel p-6 border-theme-border hover:-translate-y-1 transition-transform lg:col-span-2 md:col-span-2">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-red-400">
                Why does changing one block break the chain?
              </h4>
              <p className="text-theme-muted text-sm leading-relaxed">
                Each block contains the hash of the <strong>Previous Block</strong>. This cryptographic link forms the "chain". If you alter data in Block 1, its hash changes. Because Block 2 still points to the old hash, the link is broken (Chain Integrity Broken). You would have to re-mine Block 1 and every single subsequent block to fix the chain!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSimulator;
