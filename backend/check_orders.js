require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive').then(async () => {
  const orders = await Order.find().sort({ createdAt: -1 });
  console.log('Total Orders Data:', orders.map(o => ({id: o._id, user: o.user, status: o.status})));
  process.exit(0);
});
