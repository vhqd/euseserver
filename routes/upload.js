var express = require('express');
var uploadController = require('../controllers/upload')
var router = express.Router();

router.post('/addPicture', uploadController.upload.single('img'), function (req, res, next) {
    console.log(req.body.picTitle)//console.log(req.query.picTitle);//get
    console.log(req.body.picType)
    console.log(req.file)//req.file文件的具体信息
    res.send({ ret_code: req.file.path,code:200 });
});

module.exports = router;