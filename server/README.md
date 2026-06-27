# HashSphere Backend

This is the lightweight backend for HashSphere, built with Node.js and Express.

## Architecture

- Uses MVC (Model-View-Controller) pattern.
- No database; uses `fs` to read/write JSON files (`data/blocks.json`, `data/feedback.json`).
- `cors` enabled for seamless integration with the Vite React frontend.

## API Endpoints

- `GET /api/prices`: Proxies the CoinGecko API to fetch live cryptocurrency prices.
- `POST /api/block`: Saves a mined block's data.
- `GET /api/block`: Retrieves all mined block history.
- `POST /api/feedback`: Submits user feedback.
- `GET /api/feedback`: Retrieves all user feedback.
- `GET /api/health`: Basic health check endpoint.

## Run Development Server

```bash
cd server
npm run dev
```

The server will run on http://localhost:5000.
