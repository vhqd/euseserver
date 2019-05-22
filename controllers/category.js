const categoryModel = require('../models/category')

//获取所有栏目
const category = async (req, res, next) => {
    let categorydata = await categoryModel.categorylist();
    console.log("==============" + categorydata)
    if (categorydata) {
        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                category: categorydata
            }
        })
    } else {
        res.send({
            msg: '获取栏目失败',
            code: -1
        })
    }
}

module.exports = {
    category
}
