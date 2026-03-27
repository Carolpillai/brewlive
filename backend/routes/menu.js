const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    console.log('[MENU] Fetching menu items...');
    const menuItems = await MenuItem.find();
    console.log(`[MENU] Found ${menuItems.length} items`);
    res.json(menuItems);
  } catch (err) {
    console.error('[MENU] Error fetching menu:', err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/recommendations/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`[MENU] Fetching recs for user ${userId}`);
    
    const pastOrders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
    
    if (pastOrders.length === 0) {
      console.log('[MENU] No past orders, sending random items');
      const randomItems = await MenuItem.aggregate([{ $sample: { size: 3 } }]);
      return res.json(randomItems);
    }

    const categories = pastOrders.map(o => o.drink);
    const recommendations = await MenuItem.find({ category: { $ne: null } }).limit(3);
    res.json(recommendations);
  } catch (err) {
    console.error('[MENU] Error fetching recs:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
