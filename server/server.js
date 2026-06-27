const express = require('express');
const cors = require('cors');

const cryptoRoutes = require('./routes/crypto.routes');
const blockRoutes = require('./routes/block.routes');
const feedbackRoutes = require('./routes/feedback.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/prices', cryptoRoutes);
app.use('/api/block', blockRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "Running",
    server: "HashSphere Backend",
    version: "1.0.0"
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "API Endpoint Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
