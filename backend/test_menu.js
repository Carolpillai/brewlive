require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

async function test() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';
    await mongoose.connect(MONGO_URI);
    const items = await MenuItem.find();
    console.log('Items found:', items.length);
    console.log('Sample item:', items[0]);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
