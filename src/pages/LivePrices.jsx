import React, { useState, useEffect } from 'react';
import { fetchCryptoPrices } from '../services/api';
import CryptoCard from '../components/CryptoCard';
import Loader from '../components/Loader';
import { RefreshCw, Search, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const LivePrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const coinMap = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'solana': 'Solana',
    'arbitrum': 'Arbitrum',
    'matic-network': 'Polygon (MATIC)'
  };

  const loadData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    try {
      const data = await fetchCryptoPrices();
      // Transform object to array for mapping
      const formattedData = Object.entries(data).map(([id, values]) => ({
        id,
        name: coinMap[id] || id,
        ...values
      }));
      // Sort by price high to low roughly
      formattedData.sort((a, b) => b.usd - a.usd);
      
      setPrices(formattedData);
      setLastUpdated(new Date());
      if (isRefresh) toast.success('Prices updated successfully');
    } catch (err) {
      setError('Failed to fetch live prices. The API might be rate limited.');
      if (isRefresh) toast.error('Failed to update prices');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      loadData(true);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    loadData(true);
  };

  const filteredPrices = prices.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    coin.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            >
              Live <span className="gradient-text">Market Data</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg"
            >
              Real-time cryptocurrency prices powered by CoinGecko.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
          >
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search coin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>
            
            <button 
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="flex items-center justify-center gap-2 px-4 py-2 glass-panel hover:bg-slate-800/80 transition-all rounded-xl w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </motion.div>
        </div>

        {error && !loading && (
          <div className="glass-panel border-red-500/30 bg-red-500/5 p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-medium">Error loading data</h4>
              <p className="text-sm text-slate-400">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrices.map((coin, index) => (
                <CryptoCard key={coin.id} coin={coin} index={index} />
              ))}
            </div>
            
            {filteredPrices.length === 0 && !error && (
              <div className="text-center py-20 text-slate-500">
                No coins found matching "{searchTerm}"
              </div>
            )}
            
            <div className="mt-8 text-center text-sm text-slate-500">
              Last updated: {lastUpdated.toLocaleTimeString()} (Auto-refreshes every 30s)
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LivePrices;
