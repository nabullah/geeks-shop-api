const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsCategory = new Schema({
  title: {
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
    default: "",
  },
  rating: {
    required: false,
    type: String,
    default: "",
  },
});

let productCategoryM = mongoose.model("productsCategory", productsCategory);
module.exports = productCategoryM;
