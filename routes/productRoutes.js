const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes for product management
router.post("/", authMiddleware, addProduct); // Add product
router.get("/", authMiddleware, getProducts); // Get products (pagination)
router.put("/:id", authMiddleware, updateProduct); // Update product
router.delete("/:id", authMiddleware, deleteProduct); // Delete product

module.exports = router;
