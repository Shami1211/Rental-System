const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Routers
const itemRouter = require("./Routes/ItemRoute");


// Middlewares
app.use(express.json());
app.use(cors());
app.use("/items", itemRouter); // localhost:5000/items


// Configuration
const PORT = process.env.PORT || 8080;
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://admin:jiCG8f44dLD88zfS@cluster0.evmm97r.mongodb.net/";
const DEV_MODE = process.env.DEV_MODE || "development";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });
