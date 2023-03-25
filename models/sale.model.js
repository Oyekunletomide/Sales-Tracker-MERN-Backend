const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the sale model. */
const saleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
     required: true,
  },
});

module.exports = mongoose.model("Sale", saleSchema);