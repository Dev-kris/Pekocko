const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, 'Name is too long'],
  }, //front end is not setup to notify
  manufacturer: {
    type: String,
    required: true,
    minlength: [3, 'Please enter a valid manufacturer name!'],
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Please enter a description'],
    maxlength: 100,
  },
  mainPepper: {
    type: String,
    required: true,
    minlength: [4, 'Please provide the pepper name'],
    maxlength: 20,
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
  userId: { type: String, required: true },
});

sauceSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Sauce', sauceSchema);
