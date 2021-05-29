const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validator = require('../middleware/validator');
const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/likes');

//sauces routes, authentication > sanitization > multer
router.post('/', auth, validator.createSauce, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, likeCtrl.likesSystem);

module.exports = router;
