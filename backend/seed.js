require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const menuItems = [
  {
    name: 'Espresso',
    description: 'A concentrated form of coffee served in small, strong shots.',
    price: 3.50,
    category: 'Espressos',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    pairingSuggestion: 'Pairs perfectly with our Dark Chocolate Brownie 🍫'
  },
  {
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam on top.',
    price: 4.75,
    category: 'Lattes',
    image: 'https://images.unsplash.com/photo-1541167760496-162955ed2a95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    pairingSuggestion: 'Try it with our Cinnamon Roll 🥐'
  },
  {
    name: 'Cappuccino',
    description: 'Equal parts of espresso, steamed milk, and milk foam.',
    price: 4.50,
    category: 'Cappuccinos',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    pairingSuggestion: 'Goes great with our Blueberry Muffin 🫐'
  },
  {
    name: 'Cold Brew',
    description: 'Coffee brewed with cold water for an extended period, which creates a smooth, sweet flavor.',
    price: 4.25,
    category: 'Cold Brews',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    pairingSuggestion: 'Perfect with our Vanilla Cheesecake 🍰'
  },
  {
    name: 'Matcha Latte',
    description: 'A tea-based latte made with fine-ground green tea powder.',
    price: 5.25,
    category: 'Matcha Lattes',
    image: 'https://images.unsplash.com/photo-1536412597336-3ec266048d0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    pairingSuggestion: 'Lovely with our Butter Croissant 🥐'
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';
    await mongoose.connect(MONGO_URI);
    await MenuItem.deleteMany();
    await MenuItem.insertMany(menuItems);
    console.log('Database seeded with menu items');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
