<div align="center">
  <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status Badge"/>
  
  <br />
  
  <h1>🌌 HashSphere</h1>
  
  <p><strong>Explore the World of Blockchain, One Hash at a Time.</strong></p>

  <p>
    <a href="#-about">About</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-folder-structure">Structure</a> •
    <a href="#-installation">Installation</a>
  </p>
</div>

---

## 📖 About

**HashSphere** is an interactive, educational Web3 platform designed to demystify Blockchain fundamentals for absolute beginners. Built as part of the **Arbitrum Builder Pods assignment**, HashSphere bridges the gap between complex cryptographic theory and accessible interactive learning. 

The platform offers a hands-on experience through a real-time cryptocurrency dashboard tracking market movements and a comprehensive, browser-based blockchain simulator where users can hash data, mine blocks using Proof of Work, and visualize chain validation in real-time.

---

## ✨ Features

| Feature | Status |
| :--- | :---: |
| **Responsive Web3 Landing Page** | ✅ |
| **Interactive Concept Cards** | ✅ |
| **Live Crypto Dashboard** | ✅ |
| **CoinGecko API Integration** | ✅ |
| **Interactive Mining Simulator** | ✅ |
| **SHA-256 Cryptographic Hashing** | ✅ |
| **Proof of Work Simulation** | ✅ |
| **Real-time Chain Validation** | ✅ |
| **Glassmorphism UI Design** | ✅ |
| **Theme Toggle (Light/Dark)** | ✅ |
| **Framer Motion Animations** | ✅ |

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite 8 |
| **Backend** | Node.js, Express.js |
| **Language** | JavaScript (ES6+) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Custom Glassmorphism |
| **Routing** | React Router DOM |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **API** | CoinGecko REST API |
| **HTTP Client** | Axios (Backend) / Fetch (Frontend) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Hashing Logic** | Web Crypto API / Custom SHA-256 (`blockchain.js`) |
| **Notifications** | React Hot Toast |
| **Package Manager** | npm |
| **Version Control** | Git |

---

## 📦 Dependencies

| Package | Purpose |
| :--- | :--- |
| `react` / `react-dom` | Core UI Library |
| `vite` | Next-generation Build Tool |
| `tailwindcss` | Utility-first CSS framework |
| `framer-motion` | Declarative UI animations & micro-interactions |
| `lucide-react` | Beautiful, consistent iconography |
| `react-router-dom` | Client-side routing |
| `express` | Lightweight backend server framework |
| `axios` | Promise-based HTTP client (server proxying) |
| `cors` | Cross-Origin Resource Sharing middleware |

---

## 📂 Folder Structure

```text
HashSphere/
├── public/                 # Static public assets
├── server/                 # Express backend directory
│   ├── package.json        # Backend dependencies
│   └── server.js           # API proxies and server configuration
├── src/                    # Frontend React source code
│   ├── assets/             # Images and local media
│   ├── components/         # Reusable UI components (Footer, FeatureCard, etc.)
│   ├── pages/              # Application routes (Home, Concepts, Simulator, etc.)
│   ├── services/           # External API integration services
│   ├── utils/              # Helper functions (blockchain.js)
│   ├── App.jsx             # Main application container & router
│   ├── index.css           # Global Tailwind CSS and design tokens
│   └── main.jsx            # React application entry point
├── package.json            # Frontend workspace configuration
├── tailwind.config.js      # Tailwind configuration and theme extensions
└── vite.config.js          # Vite build configuration
```

---

## 🌐 Website Pages

| Page | Description |
| :--- | :--- |
| **Home** | Premium landing page featuring an animated Web3 illustration, learning timeline, interactive statistics, and a "Why Choose Us" section. |
| **Concepts** | Educational modules breaking down core Web3 fundamentals like distributed ledgers, smart contracts, and Ethereum. |
| **Live Prices** | A real-time dashboard fetching live cryptocurrency market data (Bitcoin, Ethereum, etc.) with robust fallback handling. |
| **Block Simulator** | An interactive sandbox where users input data, calculate SHA-256 hashes, and simulate mining a blockchain block. |

---

## 🎨 Design System

- **Theme**: High-contrast, premium Web3 aesthetic.
- **Color Palette**: 
  - Primary: `Emerald` (`#10B981`) & `Cyan` (`#34D399`)
  - Accent: `Gold` (`#D4AF37`)
  - Background: Deep Dark `Theme-BG` (`#0B0F0C`)
- **UI Style**: Glassmorphism (translucent backgrounds, soft borders, heavy backdrop blurs).
- **Animations**: Extensive use of `framer-motion` for scroll fade-ins, hover lifts, button ripples, and continuous background particle/orbit effects.
- **Typography**: Inter (Body), Space Grotesk (Headings), Fira Code (Data/Hashes).

---

## 🌍 APIs Used

- **CoinGecko API**: Used within the `Live Prices` dashboard and backed by the Express server to fetch real-time cryptocurrency prices, market caps, and 24h percentage changes. Fallback mock data is intelligently utilized to prevent rate-limiting disruptions.

---

## ⚙ Installation

Follow these steps to run HashSphere locally on your machine.

**1. Clone the repository:**
```bash
git clone https://github.com/Kaxyaa-flux/HashSphere.git
cd HashSphere
```

**2. Install Frontend Dependencies & Start Client:**
```bash
npm install
npm run dev
```

**3. Install Backend Dependencies & Start Server (Optional):**
```bash
cd server
npm install
npm run dev
```

---

## 📸 Screenshots

> *Replace the placeholder URLs below with actual screenshots of your running application.*

| Home Page | Block Simulator |
| :---: | :---: |
| ![Home Placeholder](https://via.placeholder.com/600x350?text=Home+Page+Screenshot) | ![Simulator Placeholder](https://via.placeholder.com/600x350?text=Simulator+Screenshot) |
| **Live Crypto Prices** | **Concepts Layout** |
| ![Live Prices Placeholder](https://via.placeholder.com/600x350?text=Live+Prices+Screenshot) | ![Concepts Placeholder](https://via.placeholder.com/600x350?text=Concepts+Screenshot) |

---

## 🚀 Future Improvements

- **Wallet Integration**: Implement `ethers.js` or `viem` to allow users to connect MetaMask and explore real transaction signing.
- **Blockchain Explorer**: Expand the simulator into a multi-block, distributed visualization where multiple nodes attempt to validate chains.
- **Historical Charts**: Add interactive charting capabilities to the Live Prices dashboard using Recharts or Chart.js.

---

## 👨‍💻 Developer

**Kanak Bharara**  
🔗 [GitHub Profile](https://github.com/Kaxyaa-flux)

---

## 🙏 Acknowledgements

- **Arbitrum Builder Pods** - For the inspiration and assignment structure.
- **CoinGecko API** - For providing reliable crypto market data.
- **Open Source Community** - Huge thanks to the maintainers of React, Vite, Tailwind CSS, and Framer Motion.

---

## 📄 License

This is an **Educational Project** created for learning and demonstration purposes.
