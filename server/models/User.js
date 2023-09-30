const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 4,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;