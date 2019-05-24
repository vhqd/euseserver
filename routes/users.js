var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('users');
}); */
//登录
router.post('/login', userController.login);
//退出
router.get('/logout', userController.logout);
//获取所有用户列表
router.get('/users', userController.userlist)
//添加新用户
router.post('/adduser', userController.adduser)
//编辑用户
router.post('/edituser', userController.edituser)
//删除一个用户
router.post('/deleteuser', userController.deleteuser)

module.exports = router;
