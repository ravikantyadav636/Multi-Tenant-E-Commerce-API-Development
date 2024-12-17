const express = require("express");
const {
  getOrders,
  markOrderShipped,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes for order management
router.get("/", authMiddleware, getOrders); // Get vendor's orders
router.put("/:id", authMiddleware, markOrderShipped); // Mark order as shipped

module.exports = router;
