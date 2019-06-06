var { getNowFormatDate } = require('./../untils/base')

var datatime = 'public/images/'+getNowFormatDate();
//将图片放到服务器
var multer = require('multer')
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: datatime,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
     }
}); 
var upload = multer({
    storage: storage
});


module.exports = {
    upload
}