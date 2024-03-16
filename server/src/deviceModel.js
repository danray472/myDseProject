import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true,
    required: true
  },
  deviceType: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String, // Assuming customer email is a string
    required: true
  },
  deviceState: {
    type: String,
    enum: ['In-repair', 'Completed', 'Received', 'Trash'],
    default: 'In-repair'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Device = mongoose.model('Device', deviceSchema);

export { Device, deviceSchema };
