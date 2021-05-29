const { check, validationResult } = require('express-validator');

//validation to remove scripting symbols
exports.createSauce = [
  check('name').trim().escape(),
  check('manufacturer').trim().escape(),
  check('description').trim().escape(),
  check('mainPepper').trim().escape(),
];
