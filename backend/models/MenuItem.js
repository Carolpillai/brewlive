const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['Lattes', 'Cold Brews', 'Espressos', 'Cappuccinos', 'Matcha Lattes', 'Chocolate & Tea', 'Food'] },
  image: { type: String, required: true },
  pairingSuggestion: { type: String, required: true },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
