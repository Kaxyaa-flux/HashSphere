import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Concepts from './pages/Concepts';
import LivePrices from './pages/LivePrices';
import BlockSimulator from './pages/BlockSimulator';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/concepts" element={<Concepts />} />
          <Route path="/prices" element={<LivePrices />} />
          <Route path="/simulator" element={<BlockSimulator />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" toastOptions={{ 
        style: { 
          background: '#1e293b', 
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)' 
        } 
      }} />
    </div>
  );
}

export default App;
