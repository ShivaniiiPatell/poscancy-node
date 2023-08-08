const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  birthdate: Date,
  contact: Number,
  address: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
