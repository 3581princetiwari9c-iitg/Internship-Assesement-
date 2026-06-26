# Dish Management Backend

RESTful API server with WebSocket support for real-time dish management.

## Tech Stack

- Node.js
- Express.js
- SQLite3
- Socket.io
- dotenv

## Setup

1. Install dependencies:
```bash
npm install
```

2. Initialize database:
```bash
npm run init-db
```

3. Start server:
```bash
npm start
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database with sample data

## API Documentation

See main README.md for complete API documentation.

## Environment Variables

Create a `.env` file:

```
PORT=5000
DATABASE_PATH=./database.sqlite
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Business logic
├── models/          # Data access layer
├── routes/          # API routes
├── middleware/      # Express middleware
├── utils/           # Helper functions
└── server.js        # Entry point
```
