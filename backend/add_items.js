require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';

const newItems = [
  {
    name: "Classic Cinnamon Roll",
    description: "Warm, soft dough filled with cinnamon sugar and topped with rich cream cheese frosting.",
    price: 220,
    category: "Food",
    image: "/menu/roll.jpeg",
    pairingSuggestion: "Perfect with a warm Latte"
  },
  {
    name: "Blueberry French Toast",
    description: "Thick-cut brioche dipped in our signature custard, served with fresh blueberries and maple syrup.",
    price: 340,
    category: "Food",
    image: "/menu/blueberry french toast.jpeg",
    pairingSuggestion: "Pairs wonderfully with an Americano"
  },
  {
    name: "Fresh Garden Salad",
    description: "Crisp greens, cherry tomatoes, and cucumber tossed in our house vinaigrette.",
    price: 280,
    category: "Food",
    image: "/menu/salad.jpeg",
    pairingSuggestion: "Refreshing with a Cold Brew"
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Adding new items...');
    for (const item of newItems) {
      await MenuItem.updateOne({ name: item.name }, { $set: item }, { upsert: true });
      console.log(`Added/Updated: ${item.name}`);
    }
    console.log('Finished updating DB');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
