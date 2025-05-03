const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://full-stack-web-app-frontend.vercel.app',
  credentials: true
}));
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB Connection
mongoose.connect(process.env.ATLAS_URI || 'mongodb://localhost:27017/task-manager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// DB Test Route
app.get('/api/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      return res.json({ success: true, message: 'MongoDB is connected' });
    } else {
      return res.status(500).json({ success: false, message: 'MongoDB not connected', state: mongoose.connection.readyState });
    }
  } catch (err) {
    console.error('Test DB route error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
