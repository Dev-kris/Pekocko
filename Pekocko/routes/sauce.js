const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

//sauces route, post new sauce
//
router.post('/', sauceCtrl.createSauce);

//sauces route, needs sauce array
router.get('/', sauceCtrl.getAllSauces);

//get individual sauce
router.get('/:id', sauceCtrl.getOneSauce);

//modify sauce recipe
router.put('/:id', sauceCtrl.modifySauce);

//delete sauce recipe
router.delete('/:id', sauceCtrl.deleteSauce);

module.exports = router;
