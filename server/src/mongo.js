import mongoose from 'mongoose';

const connect = mongoose.connect('mongodb://localhost:27017/Devices');

connect.then(() => {
    console.log("Database connected successfully!")
}).catch(() => {
    console.log("Database cannot be connected.")
});

export default mongoose;
