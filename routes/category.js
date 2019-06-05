var express = require('express');
var categoryController = require('../controllers/category')
var router = express.Router();

//获取所有栏目
router.get('/category', categoryController.category);

//获取所有顶级栏目
router.get('/getcateall', categoryController.getCateAll);

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

//获取单个栏目树状导航
router.post('/getshowcate', categoryController.getShowCate);

//获取二级栏目和三级栏目树
router.get('/getlevelthree', categoryController.getLevelThree);


module.exports = router;
