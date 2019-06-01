var express = require('express');
var categoryController = require('../controllers/category')
var router = express.Router();

//获取所有栏目
router.get('/category', categoryController.category);

//添加栏目
router.post('/addcategory', categoryController.addcategory);

//删除栏目
router.post('/deletecategory', categoryController.deletecategory);

//编辑栏目
router.post('/editcategory', categoryController.editcategory);

//获取所有课程栏目
router.get('/getlevel', categoryController.getlevel);

//获取所有课程栏目
router.post('/getcate', categoryController.getcate);


//获取所有课程栏目
router.post('/test', categoryController.test);
module.exports = router;
