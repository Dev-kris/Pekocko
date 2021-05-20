const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, maxlength: 20 }, //front end is not setup to notify
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, required: true },
  usersDisliked: { type: Array, required: true },
  userId: { type: String, required: true },
});

sauceSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Sauce', sauceSchema);
