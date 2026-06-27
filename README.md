# HashSphere

> Explore the World of Blockchain, One Hash at a Time.

HashSphere is an interactive educational Web3 platform designed to help beginners learn Blockchain fundamentals through beautiful visualizations, real-time cryptocurrency prices, and an interactive blockchain simulator. It is built completely on the frontend.

## 🚀 Features

- **Educational Hub:** Simple, beginner-friendly explanations of core Web3 concepts (Web2 vs Web3, Public vs Private Keys, etc.).
- **Live Crypto Dashboard:** Real-time price tracking for top cryptocurrencies, powered by the CoinGecko API.
- **Block Mining Simulator:** Hands-on interactive simulator to understand Proof of Work, hashing (SHA-256), nonces, and chain immutability.
- **Premium UI:** Futuristic design featuring dark theme, glassmorphism, gradient text, and smooth Framer Motion animations.

## 💻 Tech Stack

- **Framework:** React + Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS (Custom configurations for Glassmorphism & Gradients)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **API Integration:** Fetching live data from [CoinGecko Public API](https://www.coingecko.com/en/api)
- **Cryptography:** Native Web Crypto API (SHA-256)

## 📁 Folder Structure

```text
src/
│
├── components/
│   ├── Block.jsx             # Individual block component for simulator
│   ├── ComparisonCard.jsx    # UI card for educational comparisons
│   ├── CryptoCard.jsx        # UI card for live prices
│   ├── FeatureCard.jsx       # Feature showcase on homepage
│   ├── Footer.jsx            # Global footer
│   ├── Loader.jsx            # Loading spinner
│   └── Navbar.jsx            # Global navigation bar
│
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Concepts.jsx          # Educational comparisons page
│   ├── LivePrices.jsx        # Crypto prices dashboard
│   └── BlockSimulator.jsx    # Interactive mining simulator
│
├── services/
│   └── api.js                # CoinGecko API integration
│
├── utils/
│   └── blockchain.js         # Pure JS SHA-256 hashing logic
│
├── App.jsx                   # Main layout and routing
├── index.css                 # Tailwind and custom utility classes
└── main.jsx                  # React application entry point
```

## 🛠️ Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kaxyaa-flux/HashSphere.git
   cd HashSphere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## 🌐 API Used

- **CoinGecko API v3**: Used to fetch simple price data and 24-hour change percentages for various cryptocurrencies.
  - Endpoint: `https://api.coingecko.com/api/v3/simple/price`

## 🔮 Future Improvements

- Add Wallet Connection functionality (e.g., MetaMask).
- Implement a simulated transaction pool to visualize mempool mechanics.
- Add historical price charts (e.g., Chart.js or Recharts).

## ⚠️ Known Issues

- The CoinGecko Public API does not require an API key but has strict rate limits. If you refresh too often, the Live Prices page may temporarily display an error until the rate limit resets.

## 🧑‍💻 Developer Information

- **Developer:** KANAK / Developer Name
- **Batch:** Web3 Innovators
- **GitHub:** [Kaxyaa-flux](https://github.com/Kaxyaa-flux)
