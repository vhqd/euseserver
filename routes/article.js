const express = require('express')
const articleController = require('../controllers/article');
const router = express.Router();

//获取所有文章
router.post('/articles',articleController.articlelist);

//添加文章
router.post('/addarticle',articleController.addarticle);

//编辑文章
router.post('/editarticle',articleController.editarticle);

//获取最近更新文章
router.post('/newarticle',articleController.newarticle);

//删除文章
router.post('/deletearticle',articleController.deletearticle);


//通过id获取文章
router.post('/getonearticle',articleController.getonearticle);

module.exports = router;