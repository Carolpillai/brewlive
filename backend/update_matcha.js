require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';

mongoose.connect(MONGO_URI).then(async () => {
  const matcha = await MenuItem.findOne({ name: "Matcha Latte" });
  if (matcha) {
    matcha.image = "/menu/macha latte.jpeg";
    await matcha.save();
    console.log('Matcha fixed!');
  }
  process.exit(0);
});
