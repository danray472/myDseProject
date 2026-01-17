// Import necessary modules
import express from 'express';
const router = express.Router();
import { Device } from './deviceModel.js'; // Import only the Device model

// --- GET ROUTES ---

// 1. Analytics Route (MUST BE AT THE TOP)
router.get('/analytics', async (req, res) => {
  try {
    console.log('Backend: Fetching Analytics...');
    const allDevices = await Device.find();

    // Repair volume (last 30 days)
    const volumeData = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      volumeData[d.toISOString().split('T')[0]] = 0;
    }

    allDevices.forEach(device => {
      const dateStr = new Date(device.createdAt || device.date || Date.now()).toISOString().split('T')[0];
      if (volumeData[dateStr] !== undefined) {
        volumeData[dateStr]++;
      }
    });

    const formattedVolume = Object.entries(volumeData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Device types
    const deviceTypeCounts = {};
    allDevices.forEach(device => {
      const type = device.deviceType || 'Unknown';
      deviceTypeCounts[type] = (deviceTypeCounts[type] || 0) + 1;
    });
    const formattedDeviceTypes = Object.entries(deviceTypeCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Avg Turnaround
    let totalTurnaround = 0;
    let completedCount = 0;
    allDevices.forEach(device => {
      const arrival = device.createdAt || device.date;
      const logs = device.statusLogs || [];
      const completionLog = logs.find(log => log.status === 'Completed');
      if (completionLog && arrival) {
        const diffTime = new Date(completionLog.timestamp) - new Date(arrival);
        if (!isNaN(diffTime) && diffTime > 0) {
          totalTurnaround += diffTime / (1000 * 60 * 60 * 24);
          completedCount++;
        }
      }
    });

    res.json({
      volume: formattedVolume,
      deviceTypes: formattedDeviceTypes,
      avgTurnaround: completedCount > 0 ? (totalTurnaround / completedCount).toFixed(1) : 0
    });
  } catch (err) {
    console.error('SERVER ERROR (Analytics):', err);
    res.status(500).json({ message: err.message });
  }
});

// 2. Specific Status Routes
router.get('/completed', async (req, res) => {
  try {
    const devices = await Device.find({ deviceState: 'Completed' }).sort({ updatedAt: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/In-repair', async (req, res) => {
  try {
    const devices = await Device.find({ deviceState: 'In-repair' }).sort({ updatedAt: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/Received', async (req, res) => {
  try {
    const devices = await Device.find({ deviceState: 'Received' }).sort({ updatedAt: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/Trash', async (req, res) => {
  try {
    const devices = await Device.find({ deviceState: 'Trash' }).sort({ updatedAt: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Catch-all GET (MUST BE BELOW SPECIFIC ONES)
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find().sort({ updatedAt: -1 });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- POST/PATCH/DELETE ---

router.post('/', async (req, res) => {
  try {
    const device = new Device({
      ...req.body,
      statusLogs: [{
        status: req.body.deviceState || 'In-repair',
        note: 'Device initially added'
      }]
    });
    const saved = await device.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Not found' });

    // Ensure statusLogs is an array
    if (!Array.isArray(device.statusLogs)) device.statusLogs = [];

    // Add current entry
    device.deviceState = req.body.deviceState;
    device.statusLogs.push({
      status: req.body.deviceState,
      note: req.body.note || `Update: ${req.body.deviceState}`,
      timestamp: new Date()
    });

    const updated = await device.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Device.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
