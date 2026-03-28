const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        dbState: mongoose.connection.readyState
    });
});

// Routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.get('/debug-orders', async (req, res) => {
  const Order = require('./models/Order');
  const User = require('./models/User');
  const orders = await Order.find().sort({createdAt: -1});
  const users = await User.find();
  res.json({ orders, users });
});

const PORT = process.env.PORT || 5050; // Use environment PORT for hosting or 5050 for local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Initial MongoDB Connection Error:', err);
    // Exit if DB is not connected to avoid 500s later
    process.exit(1);
  });
