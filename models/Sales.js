// sales.model.js
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  // date: {
  //   type: Date,
  //   required: true
  // },
  product: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
