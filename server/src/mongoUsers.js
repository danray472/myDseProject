// mongoUsers.js
import mongoose from 'mongoose';

// Connect to MongoDB for users
const usersConnection = mongoose.createConnection('mongodb://localhost:27017/users', {
 
});

usersConnection.on('connected', () => {
  console.log("Users database connected successfully!");
}); 

usersConnection.on('error', (err) => {
  console.error("Users database connection error:", err);
});


