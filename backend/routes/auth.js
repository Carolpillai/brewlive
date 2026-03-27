const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(`[AUTH] Registering: ${name} (${email})`);
    
    if (!name || !email || !password) {
        console.error('[AUTH] Missing fields:', { name: !!name, email: !!email, password: !!password });
        return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log('[AUTH] User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('[AUTH] Creating new user...');
    user = new User({ name, email, password });
    await user.save();
    console.log('[AUTH] User saved successfully');

    const secret = process.env.JWT_SECRET || 'your_secret_key';
    const token = jwt.sign({ id: user._id, name: user.name }, secret, { expiresIn: '1h' });
    
    console.log('[AUTH] Token generated');
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        loyaltyPoints: user.loyaltyPoints || 0,
        favoriteDrink: user.favoriteDrink || 'None'
      } 
    });
  } catch (err) {
    console.error('[AUTH] Registration Error:', err.name, err.message);
    if (err.stack) console.error(err.stack);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[AUTH] Login attempt:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[AUTH] Login failed: User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('[AUTH] Login failed: Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET || 'your_secret_key';
    const token = jwt.sign({ id: user._id, name: user.name }, secret, { expiresIn: '1h' });
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        loyaltyPoints: user.loyaltyPoints,
        favoriteDrink: user.favoriteDrink
      } 
    });
  } catch (err) {
    console.error('[AUTH] Login Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
