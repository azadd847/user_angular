const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("customers", userSchema);
