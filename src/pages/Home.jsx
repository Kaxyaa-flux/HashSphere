import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Coins, Cpu, ShieldCheck, Zap, Lock, Globe, Activity, Blocks, Network } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import AnimatedCounter from '../components/AnimatedCounter';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Blockchain Basics",
      description: "Learn the core concepts of distributed ledgers, hashes, and consensus mechanisms."
    },
    {
      icon: Layers,
      title: "Ethereum",
      description: "Understand how programmable blockchains are revolutionizing the digital economy."
    },
    {
      icon: Coins,
      title: "Live Crypto Dashboard",
      description: "Track real-time prices and market movements of top cryptocurrencies instantly."
    },
    {
      icon: Cpu,
      title: "Block Mining Simulator",
      description: "Get hands-on experience by mining your own virtual blockchain interactively."
    }
  ];

  const benefits = [
    { icon: Globe, title: "Transparency", desc: "Public, verifiable transactions open to everyone." },
    { icon: ShieldCheck, title: "Security", desc: "Data is cryptographically secured and immutable." },
    { icon: Lock, title: "Ownership", desc: "True control over digital assets via private keys." },
    { icon: Zap, title: "Trustless Systems", desc: "No need for centralized authorities or middlemen." }
  ];

  const titleText = "Explore the Future of ";
  const titleLetters = Array.from(titleText);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-cyan-primary mb-6 border-cyan-500/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Web3 Education Platform
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                }
              }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
            >
              {titleLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
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
              className="text-xl text-theme-muted mb-10 leading-relaxed"
            >
              HashSphere is an interactive educational Web3 platform that helps beginners learn Blockchain fundamentals through beautiful visualizations, real-time cryptocurrency prices, and an interactive blockchain simulator.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/simulator" className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-soft-blue to-purple-primary rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300 animate-pulse-glow"></div>
                <div className="relative w-full px-8 py-4 bg-theme-surface rounded-xl text-theme-text font-bold hover:bg-theme-card transition-all flex items-center justify-center gap-2 border border-theme-border">
                  Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/concepts" className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel text-soft-blue font-bold hover:bg-theme-card/80 transition-all border border-purple-primary/50 hover:border-purple-primary">
                Explore Concepts
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What is <span className="gradient-text">Web3?</span></h2>
                <div className="space-y-4 text-theme-muted">
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
                    className="w-64 h-64 border-4 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 border-4 border-dotted border-purple-500/40 rounded-full flex items-center justify-center"
                    >
                       <div className="w-24 h-24 gradient-bg rounded-full blur-xl opacity-50 animate-pulse"></div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-theme-muted max-w-2xl mx-auto">Everything you need to kickstart your journey into the world of decentralized technologies.</p>
          </div>
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

      {/* Why Learn Blockchain */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn <span className="gradient-text">Blockchain?</span></h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center mb-4 text-cyan-400">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                <p className="text-theme-muted text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-12 border-y border-slate-800 bg-theme-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-4">
              <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-theme-text mb-1"><AnimatedCounter value={25.4} decimal={1} suffix="M+" /></div>
              <div className="text-sm text-theme-muted">Daily Transactions</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-4">
              <Blocks className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-theme-text mb-1"><AnimatedCounter value={892} suffix="K+" /></div>
              <div className="text-sm text-theme-muted">Blocks Mined</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-4">
              <Network className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-theme-text mb-1"><AnimatedCounter value={120} suffix="+" /></div>
              <div className="text-sm text-theme-muted">Networks Supported</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
