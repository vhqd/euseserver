var express = require('express');
var userController = require('../controllers/users')
var router = express.Router();

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('users');
}); */
router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/users', userController.userlist)

router.post('/deleteuser',userController.deleteoneuser)

module.exports = router;
