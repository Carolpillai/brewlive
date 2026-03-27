const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://Carol:rkTIPOjJflJAF5IE@cluster0.9lq5tap.mongodb.net/brewlive?retryWrites=true&w=majority&appName=Cluster0';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  pairingSuggestion: { type: String, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

const newItems = [
  // CLASSICS
  {
    name: "Flat White",
    description: "Rich espresso and velvety milk, signed off with a perfect Florette.",
    price: 4.85,
    category: "Espressos",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Pairs perfectly with our Butter Croissant"
  },
  {
    name: "Mocha",
    description: "Expertly steamed chocolate milk blended with espresso.",
    price: 5.25,
    category: "Lattes",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Try it with our Brownie Overloaded"
  },
  // CHOCOLATE & TEA
  {
    name: "Signature Hot Chocolate",
    description: "Rich, indulgent, milky hot chocolate topped with chocolate dusting.",
    price: 4.50,
    category: "Chocolate & Tea",
    image: "https://images.unsplash.com/photo-1544787210-22bb6bc093dc?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Goes great with our Triple Chocolate Muffin"
  },
  // FRAPPE
  {
    name: "Chocolate Overload Frappe",
    description: "Creamy and decadent frappe for chocolate lovers.",
    price: 6.25,
    category: "Cold Brews",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Perfect with our Dark Chocolate Cake Slice"
  },
  {
    name: "Serene Caramel Frappe",
    description: "Smooth caramel frappe topped with cream and caramelized sugar.",
    price: 5.95,
    category: "Cold Brews",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Pairs with our Lemon Tea Cake"
  },
  // FOOD
  {
    name: "Butter Croissant",
    description: "Soft, flaky, layered French pastry laminated with butter.",
    price: 3.25,
    category: "Food",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Try it with our signature Flat White"
  },
  {
    name: "Tutti Fruity Cake",
    description: "A colorful explosion of flavors with tutti fruity bits.",
    price: 3.95,
    category: "Food",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Pairs well with Green Tea"
  },
  {
    name: "Brownie Overloaded",
    description: "Rich, chocolaty, chewy, moist brownie that melts in your mouth.",
    price: 4.50,
    category: "Food",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Excellent with a Hot Mocha"
  },
  {
    name: "Chicken Tikka Sandwich",
    description: "Tender chicken pieces coated with North Indian spices.",
    price: 6.75,
    category: "Food",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Pairs with an Iced Americano"
  },
  {
    name: "Paneer Tikka Sandwich",
    description: "Cottage cheese coated with North Indian spices.",
    price: 5.95,
    category: "Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500",
    pairingSuggestion: "Good with Iced Latte"
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    for (const item of newItems) {
      await MenuItem.updateOne({ name: item.name }, { $set: item }, { upsert: true });
      console.log(`Updated/Added: ${item.name}`);
    }
    console.log('Finished adding items');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
