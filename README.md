# Dish Management System

A professional full-stack application for managing restaurant dishes with real-time updates.

## Architecture

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: SQLite
- **Real-time Communication**: Socket.io (WebSockets)
- **API**: RESTful endpoints

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: React Hooks
- **Real-time Updates**: Socket.io Client
- **Styling**: Custom CSS with responsive design

## Features

- Display all dishes with images and metadata
- Toggle publish/unpublish status for dishes
- Real-time dashboard updates via WebSockets
- Filter dishes by status (all, published, unpublished)
- Statistics dashboard showing total, published, and unpublished counts
- Responsive design for mobile and desktop
- Error handling and loading states
- Professional UI with smooth animations

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Application entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── services/        # API service layer
    │   ├── types/           # TypeScript type definitions
    │   ├── hooks/           # Custom React hooks
    │   ├── App.tsx          # Root component
    │   └── index.tsx        # Application entry point
    ├── public/
    ├── .env                 # Environment variables
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Initialize database with sample data:
```bash
npm run init-db
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### GET /api/dishes
Fetch all dishes from the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "dishId": "d1",
      "dishName": "Margherita Pizza",
      "imageUrl": "https://example.com/image.jpg",
      "isPublished": true,
      "createdAt": "2026-06-23T10:00:00.000Z",
      "updatedAt": "2026-06-23T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

### GET /api/dishes/:dishId
Fetch a specific dish by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "dishId": "d1",
    "dishName": "Margherita Pizza",
    "imageUrl": "https://example.com/image.jpg",
    "isPublished": true
  }
}
```

### PATCH /api/dishes/:dishId/toggle
Toggle the published status of a dish.

**Response:**
```json
{
  "success": true,
  "message": "Dish status updated successfully",
  "data": {
    "dishId": "d1",
    "dishName": "Margherita Pizza",
    "imageUrl": "https://example.com/image.jpg",
    "isPublished": false
  }
}
```

## WebSocket Events

### Server to Client

**Event**: `dishUpdated`

Emitted when a dish status is changed, notifying all connected clients.

**Payload:**
```json
{
  "dishId": "d1",
  "dishName": "Margherita Pizza",
  "imageUrl": "https://example.com/image.jpg",
  "isPublished": false
}
```

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_PATH=./database.sqlite
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Database Schema

```sql
CREATE TABLE dishes (
  dishId TEXT PRIMARY KEY,
  dishName TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  isPublished INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm start
```

## Testing Real-time Updates

1. Open the dashboard in multiple browser windows
2. Toggle a dish status in one window
3. Observe the change reflected immediately in all other windows
4. Alternatively, use the API directly to change status and watch the dashboard update automatically

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build output will be in the `frontend/build` directory.

## Technologies Used

### Backend
- Express.js: Web framework
- SQLite3: Database
- Socket.io: Real-time communication
- CORS: Cross-origin resource sharing
- dotenv: Environment variable management

### Frontend
- React 18: UI library
- TypeScript: Type safety
- Socket.io Client: Real-time updates
- CSS3: Styling with animations

## License

MIT
