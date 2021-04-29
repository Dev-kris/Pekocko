const Sauce = require('../models/Sauce');
const fs = require('fs');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');

//Creates a new sauce recipe

exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    imageUrl: url + '/images/' + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Sauce Saved Successfully.',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
      console.log(error);
    });
};

//Gets all sauce recipes
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
      console.log('all sauces listed');
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//Gets a single sauce recipe
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Modifies a single sauce recipe
exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    };
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: 'Sauce updated successfully',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//Deletes a single sauce recipe
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params._id }).then((sauce) => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink('images/' + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: 'Sauce deleted successfully',
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};
