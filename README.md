# Dish Management System

A professional full-stack application for managing restaurant dishes with real-time updates.

##  Features

-  **CRUD Operations** - Create, Read, Update, Delete dishes
-  **Real-time Updates** - WebSocket integration for instant synchronization across all clients
-  **Interactive Filtering** - Click statistics cards to filter dishes by status
-  **Live Statistics** - Real-time counts for total, published, and unpublished dishes
-  **Modern UI** - Swiggy/Zomato-inspired design with glassmorphism effects
-  **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Embedded database
- **Socket.io** - Real-time WebSocket communication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Socket.io Client** - Real-time updates
- **CSS3** - Modern styling with animations

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Data access layer
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   ├── services/        # API service layer
    │   ├── types/           # TypeScript definitions
    │   ├── hooks/           # Custom React hooks
    │   └── App.tsx          # Root component
    ├── .env.example         # Environment variables template
    └── package.json
```

## Getting Started

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

3. Create environment file:
```bash
cp .env.example .env
```

4. Initialize database with sample data:
```bash
npm run init-db
```

5. Start the server:
```bash
npm start
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

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Dishes

- **GET** `/api/dishes` - Fetch all dishes
- **GET** `/api/dishes/:dishId` - Fetch single dish by ID
- **POST** `/api/dishes` - Create new dish
- **PATCH** `/api/dishes/:dishId/toggle` - Toggle publish status
- **DELETE** `/api/dishes/:dishId` - Delete dish

### Health Check

- **GET** `/health` - Server health status

## WebSocket Events

### Client → Server
- Connection established automatically

### Server → Client
- `dishCreated` - New dish added
- `dishUpdated` - Dish status changed
- `dishDeleted` - Dish removed

## Usage Guide

### Viewing Dishes
- All dishes are displayed in a grid layout
- Each card shows dish image, name, ID, and publish status

### Filtering Dishes
- Click **Total Dishes** card to view all dishes
- Click **Published** card to view only published dishes
- Click **Unpublished** card to view only unpublished dishes

### Adding a Dish
1. Click the **"+ Add Dish"** button in the header
2. Fill in the dish name and image URL
3. Toggle "Publish immediately" if needed
4. Click **"Add Dish"** to save

### Updating Status
- Click the **Publish/Unpublish** button on any dish card
- Status updates immediately across all open browser tabs

### Deleting a Dish
1. Hover over a dish card
2. Click the red **×** button in the top-right corner
3. Confirm the deletion
4. Dish is removed from database and all clients

## Testing Real-time Features

1. Open `http://localhost:3000` in two different browser windows
2. Add, update, or delete a dish in one window
3. Watch the changes appear instantly in the other window

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

## Architecture

### Backend (MVC Pattern)
- **Models** - Database operations (DishModel)
- **Controllers** - Business logic (DishController)
- **Routes** - API endpoints (dishRoutes)
- **Middleware** - Error handling, logging

### Frontend (Component-Based)
- **Components** - UI building blocks
- **Services** - API communication layer
- **Hooks** - Reusable logic (useWebSocket)
- **Types** - TypeScript interfaces

## Design Features

- **Gradient Backgrounds** - Animated color transitions
- **Glassmorphism** - Frosted glass UI elements
- **Smooth Animations** - Hover effects and transitions
- **Responsive Grid** - Adapts to screen size
- **Color Coding** - Green (published), Red (unpublished), Orange (brand)

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify Node.js is installed: `node --version`
- Ensure database is initialized: `npm run init-db`

### Frontend won't connect
- Verify backend is running on port 5000
- Check CORS settings in backend .env
- Clear browser cache and restart

### Real-time updates not working
- Check WebSocket connection in browser console
- Verify Socket.io version compatibility
- Ensure firewall allows WebSocket connections

## Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start with auto-reload (nodemon)
npm run init-db # Initialize database
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for learning or production.

## Author

Created for Internship Assessment

## Acknowledgments

- UI inspired by Swiggy and Zomato
- Icons and design patterns from modern web standards
- Real-time functionality powered by Socket.io
