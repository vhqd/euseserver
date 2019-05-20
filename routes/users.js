var express = require('express');
var userController = require('../controllers/users')
var router = express.Router();

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('users');
}); */
router.get('/login', userController.login);

router.get('/logout', userController.logout);

module.exports = router;
