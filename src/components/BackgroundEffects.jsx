import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Bitcoin, Hash, Database, Link2 } from 'lucide-react';

const BackgroundEffects = () => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  const floatingIcons = [
    { Icon: Bitcoin, color: 'text-amber-500/10', size: 120, initialPos: { x: '10%', y: '20%' }, yRange: [-20, 20] },
    { Icon: Hexagon, color: 'text-cyan-500/10', size: 180, initialPos: { x: '85%', y: '15%' }, yRange: [-30, 30] },
    { Icon: Hash, color: 'text-purple-500/10', size: 100, initialPos: { x: '75%', y: '80%' }, yRange: [-15, 15] },
    { Icon: Database, color: 'text-blue-500/10', size: 140, initialPos: { x: '15%', y: '75%' }, yRange: [-25, 25] },
    { Icon: Link2, color: 'text-emerald-500/10', size: 90, initialPos: { x: '50%', y: '50%' }, yRange: [-40, 40] },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Base radial gradient background */}
      <div className="absolute inset-0 bg-theme-bg"></div>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/30 blur-[120px] mix-blend-screen"
        animate={{
          x: [0, 50, 0, -50, 0],
          y: [0, 30, -30, 0, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[150px] mix-blend-screen"
        animate={{
          x: [0, -60, 0, 60, 0],
          y: [0, -40, 40, 0, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Crypto Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={`icon-${index}`}
          className={`absolute ${item.color}`}
          style={{ left: item.initialPos.x, top: item.initialPos.y }}
          animate={{
            y: item.yRange,
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            y: { duration: 8 + index, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            rotate: { duration: 12 + index, repeat: Infinity, ease: "linear" }
          }}
        >
          <item.Icon size={item.size} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Tiny glowing particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.2)'
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Overlay noise pattern for texture (optional premium touch) */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] mix-blend-overlay"></div>
    </div>
  );
};

export default BackgroundEffects;
