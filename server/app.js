const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000", // Local development
    "https://securedchat.vercel.app", // Production
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", routes);

connectDB();

app.use("*", (req, res, next) => {
  res.status(404).json({ error: "API Not Found" });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

module.exports = app;
