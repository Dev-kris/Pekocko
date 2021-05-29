const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post(
  '/signup',
  [body('email').isEmail().normalizeEmail().trim().escape()],
  userCtrl.signup
);
router.post('/login', userCtrl.login);

module.exports = router;
