const Product = require("../models/productModel");

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      stock,
      vendor: req.vendor._id, // Authenticated vendor's ID
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (with pagination)
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find({ vendor: req.vendor._id })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments({ vendor: req.vendor._id });

    res.status(200).json({
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.vendor._id },
      { name, price, stock },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({
      _id: id,
      vendor: req.vendor._id,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
