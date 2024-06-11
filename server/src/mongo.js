import mongoose from 'mongoose';

const connect = mongoose.connect('mongodb+srv://danray472:dseProject@dseproject.csx9lbj.mongodb.net/DseProject?retryWrites=true&w=majority');

connect.then(() => {
    console.log("Database connected successfully!!")
}).catch(() => {
    console.log("Database cannot be connected.")
});

export default mongoose;
