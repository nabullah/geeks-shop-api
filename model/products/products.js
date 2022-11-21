const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  title: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
    default: ""
  },
  rating: {
    required: false,
    type: String,
    default: ""
  },
});

let productModal = mongoose.model("products", products);
module.exports = productModal;
