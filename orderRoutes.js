const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

router.post('/orders', async (req, res) => {
    const { userId, totalPrice, items } = req.body;
    try {
        const orderId = await Order.createOrder(userId, totalPrice, items);
        res.status(201).json({ message: "Order placed successfully", orderId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;