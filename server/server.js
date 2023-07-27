// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern_chart_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a data schema
const dataSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  value: { type: Number, required: true },
});

const Data = mongoose.model('Data', dataSchema);

// API endpoint to fetch data from the database
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find().sort('-timestamp').limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
