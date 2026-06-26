# Dish Management Frontend

React TypeScript application with real-time updates for managing restaurant dishes.

## Tech Stack

- React 18
- TypeScript
- Socket.io Client
- CSS3

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Environment Variables

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Project Structure

```
src/
├── components/      # React components
├── services/        # API service layer
├── types/           # TypeScript definitions
├── hooks/           # Custom React hooks
├── App.tsx          # Root component
└── index.tsx        # Entry point
```

## Features

- Real-time dashboard updates
- Status filtering
- Responsive design
- Loading and error states
- Statistics overview
