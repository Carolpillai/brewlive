require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';

mongoose.connect(MONGO_URI).then(async () => {
  const orders = await Order.find();
  const fs = require('fs');
  fs.writeFileSync('orders_log.json', JSON.stringify(orders, null, 2));
  console.log('Orders written to JSON');
  process.exit();
});
