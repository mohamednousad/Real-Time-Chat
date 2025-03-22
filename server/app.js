const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

connectDB();

module.exports = app;
