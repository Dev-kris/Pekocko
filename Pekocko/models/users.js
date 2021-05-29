const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
