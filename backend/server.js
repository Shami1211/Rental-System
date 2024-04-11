const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// Routers
const foodRouter = require("./Routes/FoodRoute");
const cartRouter = require("./Routes/CartRoute");
const deliveryRouter = require("./Routes/DeliveryRoute");

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/foods", foodRouter); // localhost:5000/foods
app.use("/carts", cartRouter); // localhost:5000/carts
app.use("/deliveries", deliveryRouter);

mongoose;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
