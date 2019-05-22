var express = require('express');
var categoryController = require('../controllers/category')
var router = express.Router();

//获取所有栏目
router.get('/category',categoryController.category)

module.exports = router;
