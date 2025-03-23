const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

dotenv.config();
const app = express();

app.use(express.json());

const HOSTS = ["https://securedchat.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: HOSTS,
    credentials: true,
  })
);

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
