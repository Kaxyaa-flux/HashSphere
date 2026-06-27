import React from 'react';
import ComparisonCard from '../components/ComparisonCard';
import { Globe, Database, Key, Bitcoin } from 'lucide-react';
import { motion } from 'framer-motion';

const Concepts = () => {
  const comparisons = [
    {
      title: "The Internet Evolution",
      icon: Globe,
      leftTitle: "Web2",
      leftItems: [
        "Centralized platforms (e.g., Meta, Google)",
        "Users are the product (data is monetized)",
        "Requires usernames and passwords",
        "Prone to censorship and single points of failure"
      ],
      rightTitle: "Web3",
      rightItems: [
        "Decentralized networks (e.g., Ethereum, Solana)",
        "Users own their data and assets",
        "Uses crypto wallets for identity and login",
        "Censorship-resistant and distributed"
      ],
      learnMoreText: "Web3 represents a fundamental paradigm shift towards a decentralized internet. By removing intermediaries, it empowers users with true digital ownership, privacy, and permissionless innovation."
    },
    {
      title: "Data Storage",
      icon: Database,
      leftTitle: "Traditional Database",
      leftItems: [
        "Client-server architecture",
        "Admin can delete or modify any record (CRUD)",
        "Fast processing and high throughput",
        "Trust is placed in the database administrator"
      ],
      rightTitle: "Blockchain",
      rightItems: [
        "Peer-to-peer distributed network",
        "Append-only (records cannot be modified or deleted)",
        "Slower due to consensus mechanisms",
        "Trustless architecture relying on cryptography"
      ],
      learnMoreText: "While traditional databases are optimized for speed and efficiency, blockchains prioritize security and trustlessness. The append-only nature ensures a tamper-proof historical record."
    },
    {
      title: "Cryptography",
      icon: Key,
      leftTitle: "Public Key",
      leftItems: [
        "Acts like an email address or bank account number",
        "Safe to share with anyone",
        "Used to receive funds or encrypt messages sent to you",
        "Derived mathematically from the private key"
      ],
      rightTitle: "Private Key",
      rightItems: [
        "Acts like a password or PIN",
        "MUST NEVER be shared with anyone",
        "Used to authorize transactions or decrypt messages",
        "Losing it means losing access to your assets permanently"
      ],
      learnMoreText: "Asymmetric cryptography (Public/Private key pairs) is the mathematical foundation of Web3. It ensures that only the true owner of a private key can spend funds associated with their public address."
    },
    {
      title: "Top Cryptocurrencies",
      icon: Bitcoin,
      leftTitle: "Bitcoin (BTC)",
      leftItems: [
        "First generation blockchain",
        "Primarily a store of value ('Digital Gold')",
        "Limited scripting capabilities",
        "Proof of Work consensus (highly secure but energy intensive)"
      ],
      rightTitle: "Ethereum (ETH)",
      rightItems: [
        "Second generation blockchain",
        "World computer for decentralized applications (dApps)",
        "Turing complete smart contracts",
        "Proof of Stake consensus (energy efficient)"
      ],
      learnMoreText: "Bitcoin introduced the concept of digital scarcity and decentralized money. Ethereum took it a step further by introducing programmable smart contracts, enabling decentralized finance (DeFi) and NFTs."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Core <span className="gradient-text">Concepts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Master the fundamentals of blockchain technology through simple, clear comparisons.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {comparisons.map((comp, idx) => (
            <ComparisonCard 
              key={idx}
              title={comp.title}
              icon={comp.icon}
              leftTitle={comp.leftTitle}
              leftItems={comp.leftItems}
              rightTitle={comp.rightTitle}
              rightItems={comp.rightItems}
              delay={idx * 0.1}
              learnMoreText={comp.learnMoreText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Concepts;
