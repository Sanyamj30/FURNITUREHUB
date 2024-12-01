// routes/auth.js
const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.post('/signup', async (req, res) => {
try {
    const {  email, password } = req.body;
    console.log(email,password);
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Create user
    const user = await User.create({  email, password });


    res.status(201).json({ message: 'User created successfully',userid:user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Match password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });


    res.status(200).json({ message: 'Login successful',userid:user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
