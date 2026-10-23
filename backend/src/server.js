import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5050;

// Initialize Database Connection
connectDB();

// Core Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// API Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Community Health Worker Assistance Platform API',
    healthCheck: '/api/health',
    version: '1.0.0',
  });
});

app.use('/api/health', healthRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server with Graceful Port Collision Handling
const startServer = (port) => {
  const server = app
    .listen(port, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${port}`);
      console.log(`🩺 Health check ready at http://localhost:${port}/api/health`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${port} is in use. Retrying on port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('❌ Server startup error:', err);
      }
    });
};

startServer(DEFAULT_PORT);

export default app;
