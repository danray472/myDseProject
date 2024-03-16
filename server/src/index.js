import express from 'express';
import { readFile } from 'fs/promises'; // Importing 'readFile' function from 'fs/promises' module
import mongoose from './mongo.js'; // Assuming 'mongo.js' exports the mongoose connection
import cors from 'cors';
import deviceRoutes from './deviceRoutes.js'; // Assuming 'deviceRoutes.js' exports the router
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
})); 

// Routes
app.use('/devices', deviceRoutes);

// Refresh logic
  

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

/*app.length((req, res) => {
res.render("Welcome to the backend.")
});*/

// Server
app.listen(port, () => {
  console.log(`The Server is Listening on Port: ${port}`);
});
