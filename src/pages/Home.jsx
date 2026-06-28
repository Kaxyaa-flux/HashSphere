import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Layers, Coins, Cpu, ShieldCheck, Zap, 
  Lock, Globe, PlayCircle, BarChart, Pickaxe, Smile, Blocks
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import AnimatedCounter from '../components/AnimatedCounter';

const RippleLink = ({ to, children, className }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
  };

  return (
    <Link to={to} className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 block ${className}`} onClick={handleClick}>
      {isRippling && (
        <span
          className="absolute bg-white/20 rounded-full animate-[ripple-anim_600ms_linear] pointer-events-none"
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%)',
            width: '250%',
            paddingBottom: '250%',
          }}
        />
      )}
      {children}
    </Link>
  );
};

const BlockchainIllustration = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 bg-soft-blue/5 rounded-full blur-[100px] animate-pulse-glow"></div>
      
      {/* Floating Central Cube */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 bg-theme-surface/80 backdrop-blur-xl border border-soft-blue/40 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center z-20 relative"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-soft-blue to-purple-primary rounded-lg opacity-80 blur-sm absolute"></div>
        <Layers className="w-12 h-12 text-white z-10" />
      </motion.div>

      {/* Orbiting Nodes */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: i * 2 }}
          className="absolute w-full h-full flex items-center justify-center pointer-events-none"
        >
          <div className={`w-[250px] md:w-[350px] h-[1px] absolute ${i === 1 ? 'rotate-45' : i === 2 ? '-rotate-45' : ''}`}>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-3 -top-3 w-6 h-6 bg-theme-surface border border-purple-primary/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              <div className="w-2 h-2 bg-purple-primary rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      {/* Connected Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <motion.path 
          d="M100,100 L250,250 M400,100 L250,250 M100,400 L250,250 M400,400 L250,250" 
          stroke="url(#grad1)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const FloatingCards = () => (
  <div className="absolute inset-0 pointer-events-none hidden md:block z-30">
    <motion.div 
      animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }} 
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-10 right-[15%] glass-panel p-3 border-soft-blue/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center gap-3 backdrop-blur-md bg-theme-surface/80"
    >
      <div className="w-8 h-8 rounded-full bg-soft-blue/20 flex items-center justify-center text-soft-blue font-bold">₿</div>
      <div>
        <div className="text-xs font-bold text-theme-text">Bitcoin</div>
        <div className="text-[10px] text-theme-muted">Current Network</div>
      </div>
    </motion.div>

    <motion.div 
      animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }} 
      transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      className="absolute bottom-20 right-[5%] glass-panel p-3 border-purple-primary/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center gap-3 backdrop-blur-md bg-theme-surface/80"
    >
      <div className="w-8 h-8 rounded-full bg-purple-primary/20 flex items-center justify-center text-purple-primary font-bold">Ξ</div>
      <div>
        <div className="text-xs font-bold text-theme-text">Ethereum</div>
        <div className="text-[10px] text-theme-muted">Smart Contracts</div>
      </div>
    </motion.div>

    <motion.div 
      animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }} 
      transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      className="absolute top-1/2 left-[45%] glass-panel p-3 border-cyan-primary/30 shadow-[0_0_15px_rgba(52,211,153,0.15)] flex items-center gap-3 backdrop-blur-md bg-theme-surface/80"
    >
      <Blocks className="w-6 h-6 text-cyan-primary" />
      <div>
        <div className="text-xs font-bold text-theme-text">Blockchain</div>
        <div className="text-[10px] text-theme-muted">Immutable Ledger</div>
      </div>
    </motion.div>
  </div>
);

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: BookOpen, title: "Blockchain Basics", description: "Learn the core concepts of distributed ledgers, hashes, and consensus mechanisms." },
    { icon: Layers, title: "Ethereum", description: "Understand how programmable blockchains are revolutionizing the digital economy." },
    { icon: Coins, title: "Live Crypto Dashboard", description: "Track real-time prices and market movements of top cryptocurrencies instantly." },
    { icon: Cpu, title: "Block Mining Simulator", description: "Get hands-on experience by mining your own virtual blockchain interactively." }
  ];

  const benefits = [
    { icon: Globe, title: "Transparency", desc: "Public, verifiable transactions open to everyone." },
    { icon: ShieldCheck, title: "Security", desc: "Data is cryptographically secured and immutable." },
    { icon: Lock, title: "Ownership", desc: "True control over digital assets via private keys." },
    { icon: Zap, title: "Trustless Systems", desc: "No need for centralized authorities or middlemen." }
  ];

  const journeySteps = [
    "Blockchain Basics", "Cryptography", "Ethereum", 
    "Smart Contracts", "Layer 2", "Arbitrum", "Build Your Own DApps"
  ];

  const chooseReasons = [
    { icon: PlayCircle, title: "Interactive Learning", desc: "Learn by doing, not just reading." },
    { icon: BarChart, title: "Real-Time Crypto Data", desc: "Live market stats at your fingertips." },
    { icon: Pickaxe, title: "Blockchain Mining", desc: "Simulate mining a block easily." },
    { icon: Smile, title: "Beginner Friendly", desc: "Designed for absolute beginners." }
  ];

  const titleText = "Explore the Future of ";
  const titleLetters = Array.from(titleText);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Enhanced Background with Parallax */}
        <motion.div 
          animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-blue/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-primary/10 rounded-full blur-[100px]"></div>
          
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-soft-blue/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [0, -30, 0], 
                opacity: [0.2, 0.8, 0.2] 
              }}
              transition={{ 
                duration: 3 + Math.random() * 4, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            />
          ))}
          
          {/* Subtle Hexagons */}
          {[...Array(5)].map((_, i) => (
            <div key={`hex-${i}`} className="absolute border border-soft-blue/10 w-32 h-32 rotate-45"
                 style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}></div>
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-soft-blue mb-6 border-soft-blue/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-soft-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-soft-blue"></span>
                </span>
                Web3 Education Platform
              </motion.div>
              
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 1 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
                }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight font-space"
              >
                {titleText.split(" ").map((word, wordIndex, array) => (
                  <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordIndex !== array.length - 1 && (
                      <motion.span
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {"\u00A0"}
                      </motion.span>
                    )}
                  </span>
                ))}
                <br className="hidden lg:block"/>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                  className="gradient-text inline-block"
                >
                  Blockchain
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-theme-muted mb-10 leading-relaxed max-w-lg"
              >
                HashSphere is an interactive educational Web3 platform that helps beginners learn Blockchain fundamentals through beautiful visualizations, real-time cryptocurrency prices, and an interactive blockchain simulator.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <RippleLink to="/simulator" className="w-full sm:w-auto group">
                  <div className="relative w-full px-8 py-4 bg-theme-surface rounded-xl text-theme-text font-bold flex items-center justify-center gap-2 border border-theme-border shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] group-hover:border-soft-blue/40 transition-all duration-300">
                    Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </RippleLink>
                <RippleLink to="/concepts" className="w-full sm:w-auto group">
                  <div className="w-full px-8 py-4 rounded-xl glass-panel text-soft-blue font-bold border border-purple-primary/30 group-hover:border-purple-primary/60 group-hover:bg-theme-card/80 transition-all duration-300 text-center">
                    Explore Concepts
                  </div>
                </RippleLink>
              </motion.div>
            </div>

            {/* Right Content - Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <FloatingCards />
              <BlockchainIllustration />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section Polished */}
      <section className="py-12 border-y border-theme-border/50 bg-theme-surface/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="p-4 group">
              <div className="text-4xl mb-3 group-hover:-translate-y-1 transition-transform inline-block">🌍</div>
              <div className="text-4xl font-bold text-theme-text mb-1"><AnimatedCounter value={25.4} decimal={1} suffix="M+" /></div>
              <div className="text-sm font-medium text-theme-muted uppercase tracking-wider mt-2">Daily Transactions</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, delay: 0.1 }} className="p-4 group">
              <div className="text-4xl mb-3 group-hover:-translate-y-1 transition-transform inline-block">⛓</div>
              <div className="text-4xl font-bold text-theme-text mb-1"><AnimatedCounter value={892} suffix="K+" /></div>
              <div className="text-sm font-medium text-theme-muted uppercase tracking-wider mt-2">Blocks Mined</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.4, delay: 0.2 }} className="p-4 group">
              <div className="text-4xl mb-3 group-hover:-translate-y-1 transition-transform inline-block">⚡</div>
              <div className="text-4xl font-bold text-theme-text mb-1"><AnimatedCounter value={120} suffix="+" /></div>
              <div className="text-sm font-medium text-theme-muted uppercase tracking-wider mt-2">Networks Supported</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Web3 */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 overflow-hidden relative border-soft-blue/20 hover:border-soft-blue/40 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-primary/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-space">What is <span className="gradient-text">Web3?</span></h2>
                <div className="space-y-4 text-theme-muted leading-relaxed">
                  <p>
                    <strong className="text-theme-text">Blockchain</strong> is a distributed, immutable ledger that facilitates the process of recording transactions and tracking assets across a network of computers.
                  </p>
                  <p>
                    <strong className="text-theme-text">Web3</strong> is the next evolution of the internet, built on decentralized networks like blockchains. It shifts power away from centralized entities back to the users.
                  </p>
                  <p>
                    Decentralization matters because it removes single points of failure, prevents censorship, and enables trustless interactions where code, rather than corporations, enforces rules.
                  </p>
                </div>
              </div>
              <div className="flex justify-center relative">
                <motion.div 
                  animate={{ y: [-15, 15] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="relative"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 border-4 border-dashed border-soft-blue/30 rounded-full flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 border-4 border-dotted border-purple-primary/40 rounded-full flex items-center justify-center"
                    >
                       <div className="w-24 h-24 gradient-bg rounded-full blur-xl opacity-50 animate-pulse"></div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">Platform Features</h2>
            <p className="text-theme-muted max-w-2xl mx-auto">Everything you need to kickstart your journey into the world of decentralized technologies.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Section: Learning Journey */}
      <section className="py-24 bg-theme-surface/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">Your Blockchain <span className="text-soft-blue">Learning Journey</span></h2>
            <p className="text-theme-muted max-w-2xl mx-auto">Follow our structured path to master Web3 development step by step.</p>
          </motion.div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 mt-20">
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-[31px] left-8 right-8 h-1 bg-theme-border z-0">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-soft-blue via-purple-primary to-soft-blue"
              ></motion.div>
            </div>

            {/* Mobile Vertical Line */}
            <div className="block md:hidden absolute left-[31px] top-8 bottom-8 w-1 bg-theme-border z-0">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-soft-blue via-purple-primary to-soft-blue"
              ></motion.div>
            </div>
            
            {journeySteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-4 w-full md:w-[14%]"
              >
                <div className="w-16 h-16 rounded-full glass-panel border border-soft-blue/50 flex items-center justify-center bg-theme-surface shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                  <span className="text-xl font-bold text-soft-blue">{index + 1}</span>
                </div>
                <div className="md:text-center text-left flex-1 md:flex-none">
                  <h4 className="text-sm font-bold text-theme-text leading-tight">{step}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn Blockchain Polished */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">Why Learn <span className="gradient-text">Blockchain?</span></h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex flex-col items-center text-center glass-panel p-8 rounded-2xl border border-theme-border hover:border-soft-blue/40 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] group h-full"
              >
                <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mb-6 text-soft-blue bg-theme-surface/50 border border-soft-blue/20 group-hover:border-soft-blue/50 transition-colors">
                  <benefit.icon className="w-10 h-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                <p className="text-theme-muted text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Section: Why Choose HashSphere */}
      <section className="py-24 bg-theme-bg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">Why Choose <span className="text-purple-primary">HashSphere</span></h2>
            <p className="text-theme-muted max-w-2xl mx-auto">Experience a modern approach to learning decentralized tech.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {chooseReasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 rounded-2xl border border-theme-border/60 hover:border-purple-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-primary/10 flex items-center justify-center shrink-0 group-hover:bg-purple-primary/20 transition-colors">
                  <reason.icon className="w-6 h-6 text-purple-primary group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1 text-theme-text">{reason.title}</h4>
                  <p className="text-sm text-theme-muted">{reason.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
