# Bitasmbl-ChessConnect

Develop a scalable real-time multiplayer chess platform featuring a React single-page application, an Express/Node.js backend with JWT authentication, live gameplay via Socket.IO, Redis for in-memory state and pub/sub synchronization, PostgreSQL for data persistence, and Docker containerization for production deployments.

## Tech Stack
- React
- Node.js (Express)
- Socket.IO
- Redis

## Requirements
- Implement JWT authentication for all API endpoints
- Enforce chess rules on the server
- Use Redis pub/sub for synchronizing state across server instances
- Write unit tests for game logic and API routes

## Installation
1. Clone the repository  
   bash
   git clone https://github.com/YourUsername/Bitasmbl-ChessConnect.git
   cd Bitasmbl-ChessConnect
   
2. Create a `.env` file at the project root with the following variables:
   ini
   # Server
   PORT=4000
   JWT_SECRET=your_jwt_secret
   REDIS_URL=redis://localhost:6379
   DATABASE_URL=postgres://user:password@localhost:5432/chessconnect

   # Client
   REACT_APP_API_URL=http://localhost:4000/api
   
3. Install backend dependencies:
   bash
   cd server
   npm install
   
4. Install frontend dependencies:
   bash
   cd client
   npm install
   
5. (Optional) Start Redis if not already running:
   bash
   redis-server
   
6. (Optional) Launch all services with Docker:
   bash
   docker-compose up --build
   

## Usage

### Development

- Start the backend server:
  bash
  cd server
  npm run dev
  
- Start the React frontend:
  bash
  cd client
  npm start
  

### Production

- Build and run containers:
  bash
  docker-compose up --build
  

## Implementation Steps
1. Initialize project structure with separate `client/` (React) and `server/` (Express) directories.
2. Configure Express with JWT-based authentication middleware applied to all `/api` routes.
3. Develop a chess engine module on the server to validate moves and enforce rules.
4. Integrate Socket.IO on both client and server for real-time game communication.
5. Set up Redis client for caching in-memory game state and use pub/sub to broadcast updates across instances.
6. Connect to PostgreSQL for persisting user accounts and game history.
7. Write unit tests using Jest for game logic and API routes to ensure correctness.
8. Create Dockerfiles for the client and server, plus a `docker-compose.yml` for full-stack orchestration.
9. Configure environment variables and networking to support scaling multiple server instances.

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate a user and receive a JWT
- `GET /api/games` — List active games (requires JWT)
- `POST /api/games` — Create a new game session (requires JWT)
- `GET /api/games/:id` — Retrieve current game state (requires JWT)
- `POST /api/games/:id/move` — Submit a chess move (validates server-side, broadcasts via Socket.IO)