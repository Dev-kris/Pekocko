const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password too short!'],
    maxlength: 12,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
