const articleModel = require('../models/article')

//获取所有文章
const articlelist = (req, res, next) => {
    let datas = req.body;
    console.log(datas);
    articleModel.articlelist(datas,res);
} 

//编辑文章
const editarticle = async (req, res, next) => {
    let datas = req.body;
    let article = await articleModel.editarticles(datas);
    if (article) {
        res.send({
            msg: '编辑文章成功',
            code: 200
        })
    } else {
        res.send({
            msg: '编辑文章失败',
            code: -1
        })
    }
} 

const newarticle = (req,res,next)=>{
    let datas = req.body;
    console.log(datas);
    articleModel.newarticle(datas,res);
}

//通过id获取文章
const getonearticle = async (req, res, next) => {
    let datas = req.body;
    let article = await articleModel.getonearticle(datas);
    if (article) {
        res.send({
            msg: '获取文章成功',
            code: 200,
            data:{
                article:article
            }
        })
    } else {
        res.send({
            msg: '获取文章失败',
            code: -1
        })
    }
}

//删除文章
const deletearticle = async (req, res, next) => {
    let datas = req.body;
    let ids = [];
    datas.forEach(v => {
        ids.push(v._id)
    });

    let article = await articleModel.deletarticle(ids);
    if (article) {
        res.send({
            msg: '删除文章成功',
            code: 200
        })
    } else {
        res.send({
            msg: '删除文章失败',
            code: -1
        })
    }
}

//添加文章
const addarticle = async (req,res,next)=>{
    let datas = req.body;
    let back = await articleModel.addarticle(datas);
    if (back) {
        res.send({
            msg: '添加文章成功',
            code: 200
        })
    } else {
        res.send({
            msg: '添加文章失败',
            code: -1
        })
    }
}

module.exports = {
    articlelist,
    addarticle,
    editarticle,
    deletearticle,
    newarticle,
    getonearticle
}
