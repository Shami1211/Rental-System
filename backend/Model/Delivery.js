const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  done: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
