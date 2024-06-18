import express from 'express';
import { readFile } from 'fs/promises'; // Importing 'readFile' function from 'fs/promises' module
import mongoose from './mongo.js'; 
import cors from 'cors';
import deviceRoutes from './deviceRoutes.js';
import authRoutes from './authRoutes.js'; // Import authRoutes
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const port = 5000;
 
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://dseproject-client-1.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
})); 

process.env.JWT_SECRET = 'MySuperSecretKeyForJWTTokenGeneration123!@#'

// Routes
app.use('/devices', deviceRoutes);
app.use('/auth', authRoutes); // Mount authRoutes under /auth URL prefix

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
