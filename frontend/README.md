# Project: Watch Me Later

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

1. Install MongoDB Server & MongoDB Compass.
   Create a new connection "mongodb://localhost:27017" in MongoDB Compass.
2. Navigate to the backend folder.
   cd backend
3. Install dependencies.
   npm install
4. Create .env file in the backend root.
   MONGO_URI=mongodb://localhost:27017/wl
   JWT_SECRET=superSecret123
5. Navigate to the scripts folder and run this.
   path\backend\scripts
   node dbSeed.js
6. Check if db is populated.
7. Run backend
   path\backend
   node server.js

### Frontend Setup

1. Navigate to frontend:
   cd frontend
2. Install dependencies
   npm install
3. Run frontend
   npm start
