require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const masterItems = [
  // COFFEES - Espressos
  {
    name: "Espresso Solo",
    description: "Pure intense coffee goodness. A single shot of our signature house blend.",
    price: 180,
    category: "Espressos",
    image: "/menu/americano.jpeg",
    pairingSuggestion: "Pairs perfectly with a Dark Chocolate Square"
  },
  {
    name: "Double Shot Espresso",
    description: "Two shots of our intense house blend for those who need a real boost.",
    price: 240,
    category: "Espressos",
    image: "/menu/americano.jpeg",
    pairingSuggestion: "Pairs perfectly with our Butter Croissant"
  },

  // LATTES
  {
    name: "Signature Caffe Latte",
    description: "A silky smooth blend of espresso and perfectly steamed milk.",
    price: 280,
    category: "Lattes",
    image: "/menu/latte.jpeg",
    pairingSuggestion: "Try it with our Cinnamon Roll"
  },
  {
    name: "Iced Caffe Latte",
    description: "Our signature espresso served over ice with chilled milk.",
    price: 320,
    category: "Lattes",
    image: "/menu/latte.jpeg",
    pairingSuggestion: "Refreshingly good with a Salad"
  },

  // CAPPUCCINOS
  {
    name: "Classic Cappuccino",
    description: "Rich espresso under a thick layer of silky smooth milk foam.",
    price: 260,
    category: "Cappuccinos",
    image: "/menu/cappcuino.jpeg",
    pairingSuggestion: "Goes great with our Blueberry Muffin"
  },

  // COLD BREWS & FRAPPES
  {
    name: "Iced Americano",
    description: "Espresso shots topped with cold water for a robust flavor.",
    price: 240,
    category: "Cold Brews",
    image: "/menu/americano.jpeg",
    pairingSuggestion: "Perfect with our Vanilla Cheesecake"
  },

  // CHOCOLATE & TEA
  {
    name: "Signature Hot Chocolate",
    description: "Rich, indulgent, milky hot chocolate topped with chocolate dusting.",
    price: 260,
    category: "Chocolate & Tea",
    image: "/menu/signature hot chocolate.jpeg",
    pairingSuggestion: "Goes great with our Triple Chocolate Muffin"
  },
  {
    name: "Ceremonial Matcha Latte",
    description: "Premium ceremonial grade matcha whisked with velvety steamed milk.",
    price: 340,
    category: "Matcha Lattes",
    image: "/menu/macha latte.jpeg",
    pairingSuggestion: "Lovely with our Butter Croissant"
  },

  // FOOD
  {
    name: "Butter Croissant",
    description: "Soft, flaky, layered French pastry laminated with pure butter.",
    price: 180,
    category: "Food",
    image: "/menu/roll.jpeg",
    pairingSuggestion: "Try it with our signature Flat White"
  },
  {
    name: "Brownie Overloaded",
    description: "Rich, chocolaty, chewy, moist brownie that melts in your mouth.",
    price: 240,
    category: "Food",
    image: "/menu/bronwie.jpeg",
    pairingSuggestion: "Excellent with a Hot Mocha"
  },
  {
    name: "Classic Cinnamon Roll",
    description: "Warm, soft dough filled with cinnamon sugar and topped with rich frosting.",
    price: 220,
    category: "Food",
    image: "/menu/roll.jpeg",
    pairingSuggestion: "Perfect with a warm Latte"
  },
  {
    name: "Blueberry French Toast",
    description: "Thick-cut brioche dipped in signature custard, served with fresh blueberries.",
    price: 340,
    category: "Food",
    image: "/menu/blueberry french toast.jpeg",
    pairingSuggestion: "Pairs wonderfully with an Americano"
  },
  {
    name: "Chicken Tikka Sandwich",
    description: "Tender chicken pieces coated with North Indian spices.",
    price: 360,
    category: "Food",
    image: "/menu/chicken sandwhihc.jpeg",
    pairingSuggestion: "Pairs with an Iced Americano"
  },
  {
    name: "Paneer Tikka Sandwich",
    description: "Cottage cheese coated with North Indian spices.",
    price: 320,
    category: "Food",
    image: "/menu/panner.jpeg",
    pairingSuggestion: "Good with Iced Latte"
  },
  {
    name: "Fresh Garden Salad",
    description: "Crisp greens, cherry tomatoes, and cucumber.",
    price: 280,
    category: "Food",
    image: "/menu/salad.jpeg",
    pairingSuggestion: "Refreshing with a Cold Brew"
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/brewlive';
    await mongoose.connect(MONGO_URI);
    await MenuItem.deleteMany();
    await MenuItem.insertMany(masterItems);
    console.log(`Database seeded with ${masterItems.length} menu items using EXACT filesystem paths`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
