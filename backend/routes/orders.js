const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/', auth, async (req, res) => {
  try {
    const { drink, customization, totalPrice } = req.body;
    
    console.log(`[ORDER] Placing order for user ${req.user.id}: ${drink}`);
    
    // Ensure numeric totalPrice
    const parsedPrice = parseFloat(totalPrice);
    if (isNaN(parsedPrice)) {
       console.error('[ORDER] Invalid total price:', totalPrice);
       return res.status(400).json({ message: 'Invalid total price' });
    }

    const userIdObj = new mongoose.Types.ObjectId(req.user.id);

    const order = new Order({
      user: userIdObj,
      drink,
      customization,
      totalPrice: parsedPrice,
      status: 'Pending',
      pointsEarned: Math.floor(parsedPrice) || 0
    });

    await order.save();
    console.log('[ORDER] Order saved successfully:', order._id);

    // Update loyalty points
    const user = await User.findById(req.user.id);
    if (!user) {
        console.error('[ORDER] User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
    }

    // Ensure loyaltyPoints is a number before adding
    user.loyaltyPoints = (Number(user.loyaltyPoints) || 0) + order.pointsEarned;
    
    // Logic for favorite drink
    const orders = await Order.find({ user: userIdObj });
    if (orders.length > 0) {
        const counts = {};
        orders.forEach(o => counts[o.drink] = (counts[o.drink] || 0) + 1);
        const favorite = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        user.favoriteDrink = favorite;
    }
    
    await user.save();
    console.log('[ORDER] User updated with points and favorite');

    res.status(201).json(order);
  } catch (err) {
    console.error('[ORDER] Failed to place order:', err);
    res.status(500).json({ message: 'Failed to place order: ' + err.message });
  }
});

router.get('/history/:userId', auth, async (req, res) => {
  try {
    let userIdString = req.params.userId !== 'unknown' ? req.params.userId : req.user.id;
    if (typeof userIdString === 'object' && userIdString.toString) userIdString = userIdString.toString();
    
    const userIdObj = new mongoose.Types.ObjectId(userIdString);
    const orders = await Order.find({ user: userIdObj }).sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/status/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ status: order.status, pointsEarned: order.pointsEarned });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
