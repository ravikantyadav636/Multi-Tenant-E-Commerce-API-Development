const jwt = require("jsonwebtoken");
const Vendor = require("../models/vendorModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.vendor = await Vendor.findById(decoded.id).select("-password");
    if (!req.vendor) throw new Error("Vendor not found");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
