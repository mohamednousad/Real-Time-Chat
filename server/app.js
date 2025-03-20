const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const { initSocket } = require("./socket");
const http = require("http");

dotenv.config();
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

// Connect DB
connectDB();

// Initialize Socket.io
initSocket(server);

module.exports = { app, server };
