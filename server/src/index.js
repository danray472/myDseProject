import express from 'express';
import { readFile } from 'fs/promises'; // Importing 'readFile' function from 'fs/promises' module
import mongoose from './mongo.js';
import cors from 'cors';
import deviceRoutes from './deviceRoutes.js';
import authRoutes from './authRoutes.js'; // Import authRoutes
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://dseproject-client-1.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
})); 

// Ensure JWT_SECRET is set via environment variable in production
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'MySuperSecretKeyForJWTTokenGeneration123!@#';
}

// Serve static files from the React app
app.use(express.static(path.join(path.resolve(), 'build')));

// API Routes
app.use('/devices', deviceRoutes);
app.use('/auth', authRoutes); // Mount authRoutes under /auth URL prefix

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Server
app.listen(port, () => {
  console.log(`The Server is Listening on Port: ${port}`);
});
