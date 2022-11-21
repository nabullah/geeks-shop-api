const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: false,
  },

  password: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["ACTIVE", "BLOCK", "DELETE"],
    default: "ACTIVE",
  },

  userType: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

let userModel = mongoose.model("users", userSchema);
module.exports = userModel;
