const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/vendorModel");

// Generate JWT Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// Register Vendor
exports.registerVendor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const vendorExists = await Vendor.findOne({ email });
    if (vendorExists)
      return res.status(400).json({ message: "Email already exists" });

    const vendor = await Vendor.create({ name, email, password });
    res.status(201).json({ token: generateToken(vendor._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Vendor
exports.loginVendor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ token: generateToken(vendor._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
