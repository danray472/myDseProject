// Import necessary modules
import express from 'express';
const router = express.Router();
import { Device } from './deviceModel.js'; // Import only the Device model

// Route to get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  // Route to get completed devices
router.get('/completed', async (req, res) => {
  try {
    const completedDevices = await Device.find({ deviceState: 'Completed' });
    res.json(completedDevices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 //Route to get InRepair devices
router.get('/In-repair', async (req, res) => {
  try{
    const InRepair = await Device.find({deviceState: 'In-repair'})
    res.json(InRepair);
  }
  catch(err){
  res.status(500).json({message: err.message})
  }
})

 //Route to get received devices
 router.get('/Received', async (req, res) => {
  try{
    const Received = await Device.find({deviceState: 'Received'})
    res.json(Received);
  }
  catch(err){
  res.status(500).json({message: err.message})
  }
})

  //Route to get received devices
  router.get('/Trash', async (req, res) => {
    try{
      const Removed = await Device.find({deviceState: 'Trash'})
      res.json(Removed);
    }
    catch(err){
    res.status(500).json({message: err.message})
    }
  })

});

// Route to create a new device
router.post('/', async (req, res) => { 
  const { deviceType, customerName, ticketNumber, customerEmail } = req.body; // Destructure request body

  try {
    const device = new Device({
      deviceType,
      customerName,
      ticketNumber,
      customerEmail,
      deviceState: 'In-repair',
      date: new Date() // Add the current date
    });
  
    // Save the new device to the database
    const newDevice = await device.save();
  
    // Log information about the added device
    console.log('Device added:', newDevice);
  
    // Send a success response
    res.status(201).json(newDevice);
  } catch (err) {
    // If there's an error, send an error response
    console.error('Error adding device:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a device's state
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { deviceState } = req.body;

    const updatedDevice = await Device.findByIdAndUpdate(id, { deviceState }, { new: true });

    console.log('Device Updated Sucessfull!', updatedDevice);

    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a device
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDevice = await Device.findByIdAndDelete(id);

    if (!deletedDevice) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.json({ message: 'Device deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
