const { getSales, addSale, deleteSale, updateSale, getAsale, } = require("../controllers/sale.controller");
const Sale = require("../models/sale.model");
const express = require("express");



const router = express.Router();

/* Creating a route for the get request. */
router.get("/sales", getSales);
/* Creating a route for the post request. */

router.get("/sales/:id", getAsale);

router.post("/sale", addSale);

router.delete('/sales/:id', deleteSale)

router.put('/sale/:id', updateSale)

module.exports = router;