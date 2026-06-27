import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Concepts from './pages/Concepts';
import LivePrices from './pages/LivePrices';
import BlockSimulator from './pages/BlockSimulator';
import { Toaster } from 'react-hot-toast';
import PageLoader from './components/PageLoader';
import ScrollProgress from './components/ScrollProgress';
import FloatingSupport from './components/FloatingSupport';
import BackgroundEffects from './components/BackgroundEffects';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <PageLoader onComplete={() => setIsLoading(false)} />
      <ScrollProgress />
      <BackgroundEffects />
      <BackToTop />
      
      {!isLoading && (
        <div className="flex flex-col min-h-screen relative z-10">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/concepts" element={<PageTransition><Concepts /></PageTransition>} />
            <Route path="/prices" element={<PageTransition><LivePrices /></PageTransition>} />
            <Route path="/simulator" element={<PageTransition><BlockSimulator /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingSupport />
      <Toaster position="bottom-right" toastOptions={{ 
        style: { 
          background: 'rgba(30, 41, 59, 0.8)', 
          backdropFilter: 'blur(10px)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)' 
        } 
      }} />
        </div>
      )}
    </>
  );
}

export default App;
