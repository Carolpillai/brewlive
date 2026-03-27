require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const imageMap = {
  "latte": "/menu/latte.jpeg",
  "signature hot chocolate": "/menu/signature hot chocolate.jpeg",
  "matcha": "/menu/macha latte.jpeg",
  "americano": "/menu/americano.jpeg",
  "cappuccino": "/menu/cappcuino.jpeg",
  "chicken": "/menu/chicken sandwhihc.jpeg",
  "paneer": "/menu/panner.jpeg",
  "brownie": "/menu/bronwie.jpeg"
};

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Starting update...');
    
    const items = await MenuItem.find();
    for (let item of items) {
      const lowerName = item.name.toLowerCase();
      
      // Check for matching image
      for (const [key, imagePath] of Object.entries(imageMap)) {
        if (lowerName.includes(key)) {
          item.image = imagePath;
          break;
        }
      }
      
      // Update price if it looks like it is in USD (< 20)
      if (item.price < 30) {
        item.price = parseFloat((item.price * 80).toFixed(2));
      }
      
      await item.save();
      console.log(`Updated ${item.name} | Image: ${item.image} | Price: ₹${item.price}`);
    }
    
    console.log('Database successfully updated.');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
