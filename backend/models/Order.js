const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drink: { type: String, required: true },
  customization: {
    size: { type: String, enum: ['small', 'medium', 'large'] },
    milk: { type: String, enum: ['whole', 'oat', 'almond', 'soy', 'none'] },
    sugar: { type: String, enum: ['none', 'light', 'medium', 'sweet'] },
    extraShot: { type: Boolean, default: false },
    whippedCream: { type: Boolean, default: false },
    specialInstructions: { type: String, default: '' },
  },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Brewing', 'Ready', 'Picked Up'], default: 'Pending' },
  pointsEarned: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
