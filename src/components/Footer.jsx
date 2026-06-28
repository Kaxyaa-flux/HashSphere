import React from 'react';
import { Code2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-soft-blue/30 bg-theme-card/60 backdrop-blur-md mt-12 pt-12 pb-6 relative z-10 shadow-[0_-10px_30px_rgba(16,185,129,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Left Section - Branding */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold font-space tracking-tight mb-3">
              Hash<span className="gradient-text">Sphere</span>
            </h2>
            <p className="text-purple-primary font-medium mb-4 italic">
              "Explore the World of Blockchain, One Hash at a Time."
            </p>
            <p className="text-sm text-theme-muted leading-relaxed">
              An interactive Web3 learning platform that simplifies Blockchain concepts through real-time data, visual comparisons, and hands-on mining simulations.
            </p>
          </div>

          {/* Center Section - Quick Links */}
          <div className="flex flex-col md:items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold font-space text-theme-text mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Concepts', path: '/concepts' },
                  { name: 'Live Prices', path: '/prices' },
                  { name: 'Block Simulator', path: '/simulator' }
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.path} 
                      className="text-theme-muted hover:text-soft-blue transition-colors duration-300 relative group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-blue rounded"
                      aria-label={`Go to ${item.name} page`}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-soft-blue transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section - Developer */}
          <div className="flex flex-col md:items-end">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold font-space text-theme-text mb-6">Developer</h3>
              <p className="text-theme-muted font-medium mb-4">Kanak Bharara</p>
              
              <a 
                href="https://github.com/Kaxyaa-flux"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-theme-muted hover:text-soft-blue transition-all duration-300 group hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] p-2 rounded-lg -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-blue"
                aria-label="Visit Kanak Bharara's GitHub profile"
              >
                <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 group-hover:text-soft-blue transition-colors" />
                  <span className="font-medium">GitHub Profile</span>
                </motion.div>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="border-t border-theme-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-theme-muted">
          <p className="hover:text-theme-text transition-colors">
            &copy; 2026 HashSphere. All Rights Reserved.
          </p>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="flex items-center gap-1 hover:text-theme-text transition-colors">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> by <span className="font-medium">Kanak Bharara</span>
            </p>
            <p className="hover:text-theme-text transition-colors">
              Batch: <span className="font-medium text-purple-primary">Anthropic Web3 Bootcamp &ndash; Batch 1</span>
            </p>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
