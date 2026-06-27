const axios = require('axios');

const getPrices = async (req, res) => {
  try {
    const ids = 'bitcoin,ethereum,solana,arbitrum,matic-network';
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching from CoinGecko:', error.message);
    // Even if CoinGecko fails, we should return a proper 500 error
    return res.status(500).json({ error: 'Failed to fetch cryptocurrency prices from CoinGecko' });
  }
};

module.exports = {
  getPrices
};
