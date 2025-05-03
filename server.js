// Step 3: Create server.js file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.ATLAS_URI || 'mongodb://localhost:27017/task-manager', {

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Add this to your server.js
app.get('/api/test-db', async (req, res) => {
    try {
      // Check if MongoDB is connected
      if (mongoose.connection.readyState === 1) {
        return res.json({ success: true, message: 'MongoDB is connected' });
      } else {
        return res.status(500).json({ success: false, message: 'MongoDB is not connected', state: mongoose.connection.readyState });
      }
    } catch (err) {
      console.error('Test DB route error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });