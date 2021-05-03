const Sauce = require('../models/Sauce');

exports.likesSystem = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;

  if (like === 0) {
    Sauce.findOne({
      _id: req.params.id,
    })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: 'Like removed' }))
            .catch((error) =>
              res.status(400).json({
                error: error,
              })
            );
        }
        if (sauce.usersDisliked.includes(userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          )
            .then(() => res.status(200).json({ message: 'Dislike removed' }))
            .catch((error) =>
              res.status(400).json({
                error: error,
              })
            );
        }
      })
      .catch((error) =>
        res.status(404).json({
          error: error,
        })
      );
  }

  if (like > 0) {
    Sauce.updateOne(
      { _id: req.params.id },
      //tried to use $addToSet here, change to $push
      { $push: { usersLiked: userId }, $inc: { likes: +1 } }
    )
      .then(() =>
        res.status(200).json({
          message: 'Liked!',
        })
      )
      .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  }
  if (like < 0) {
    Sauce.updateOne(
      { _id: req.params.id },
      { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
    )
      .then(() => {
        res.status(200).json({ message: 'Disliked' });
      })
      .catch((error) => res.status(400).json({ error: error }));
  }
};
