const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

//sauces route, post a new sauce
router.post('/', auth, sauceCtrl.createSauce);

//sauces route, gets all sauces
router.get('/', auth, sauceCtrl.getAllSauces);

//get individual sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

//modify sauce recipe
router.put('/:id', auth, sauceCtrl.modifySauce);

//delete sauce recipe
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;
