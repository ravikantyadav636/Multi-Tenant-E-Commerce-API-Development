const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();
connectDB();

// const app = express();
app.use(express.json());

// Routes
app.use("/api/vendors", require("./routes/vendorRoutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
