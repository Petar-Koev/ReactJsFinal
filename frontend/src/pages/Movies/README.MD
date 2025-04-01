# Watch Me Later

A full-stack (MongoDB, Express, React, Node.js) application for managing movie watchlists.

## Features

- User authentication (Register/Login)
- Public and Private Watchlists
- Add, edit, delete watchlists
- Add/remove movies to/from watchlists
- Mark movies as watched
- Like favorite movies
- Filter & Sort movies (title, year, genre, favorites)
- 404 Page & Toast notifications

## Project Structure

- Backend (REST API)
- Frontend (React.js)

## Getting Started

### Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
   ```
2. Install dependencies
   npm install
3. Create .env file
   MONGO_URI=mongodb://localhost:27017/watchmelater
   JWT_SECRET=yourSecretKey
4. Run backend
   node server.js

### Frontend Setup

1. Navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies
   npm install
3. Run frontend
   npm start
