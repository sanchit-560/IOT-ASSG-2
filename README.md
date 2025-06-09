# IoT Assignment 2

A full-stack web application built with React, Node.js, and MongoDB for IoT data management and visualization.

## Project Structure

The project is divided into two main parts:
- `frontend/`: React-based web application
- `backend/`: Node.js/Express server with MongoDB integration

## Features

- Modern React frontend with Vite
- RESTful API backend
- MongoDB database integration
- Docker support for both frontend and backend
- TailwindCSS for styling
- ESLint for code quality

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string and other configurations

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Deployment

Both frontend and backend include Dockerfile for containerization:

### Backend
```bash
cd backend
docker build -t iot-backend .
docker run -p 3000:3000 iot-backend
```

### Frontend
```bash
cd frontend
docker build -t iot-frontend .
docker run -p 5173:5173 iot-frontend
```

## Development

- Frontend runs on `http://localhost:5173`
- Backend API runs on `http://localhost:3000`

## Available Scripts

### Backend
- `npm start`: Start the server
- `npm test`: Run tests (not configured)

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Technologies Used

### Frontend
- React
- Vite
- TailwindCSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## License

ISC 