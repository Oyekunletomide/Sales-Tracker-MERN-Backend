// routes/sales.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sales');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get all sales by user

router.get('/', authenticate, async (req, res) => {
  const sales = await Sale.find({ user: req.user.id });
  res.status(200).json(sales);
});

// Create a sale by user

router.post('/', authenticate, async (req, res) => {
  const { product, price } = req.body;
  const sale = new Sale({ user: req.user.id, product, price });
  await sale.save();
  res.status(201).json(sale);
});

// Update a sale by user
router.put('/:id', authenticate, async (req, res) => {
  const { product, price } = req.body;

  const sale = await Sale.findOne({ _id: req.params.id, user: req.user.id });
  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  sale.product = product;
  sale.price = price;

  await sale.save();
  res.status(200).json(sale);
});

// Delete a sale by user
router.delete('/:id', authenticate, async (req, res) => {
  const sale = await Sale.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json({ message: 'Sale deleted successfully' });
});



module.exports = router;
