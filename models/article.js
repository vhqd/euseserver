const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const upload = "http://127.0.0.1:3000/server/";
const articleSchema = new mongoose.Schema({
    title: String,
    desc: String,
    creatat: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type:Schema.Types.ObjectId
    },
    imgurl:String,
    content: String
})

const articleModel = mongoose.model("articles", articleSchema);

//获取文章列表
const articlelist = (data, res) => {
    let _id = data._id;
    let pages = {
        "currentPage": data.currentPage,
        "pageSize": data.pageSize
    }
    let pageSize = parseInt(pages.pageSize) || 12;
    let currentPage = parseInt(pages.currentPage) || 1;
    console.log(data);
    getonecategory(_id, pageSize, currentPage, res);
    // return articleModel.find();
}

//获取最新文章
const newarticle = (data, res) => {
    let pageSize = parseInt(data.pageSize) || 12;
    let currentPage = parseInt(data.currentPage) || 1;
    let totalPage;
    articleModel.count({}, (err, count) => {
        totalPage = count
    });
    if (pageSize * currentPage > totalPage) {

    }
    articleModel.find()
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ 'creatat': -1 })
        .exec(function (err, docs) {
            if (err) {
                res.send({
                    msg: '获取文章失败',
                    code: -1
                })
                return false
            }
            res.send({
                msg: '获取文章成功',
                code: 200,
                data: {
                    articles: docs
                },
                page: {
                    pageSize: pageSize,
                    currentPage: currentPage,
                    totalSize: totalPage
                }
            })
            return true

        });
}

//添加文章
const addarticle = (data) => {
    console.log('====================================================');

    console.log(data);

    console.log('====================================================');
    data.imgurl = upload+data.imgurl
    let article = new articleModel(data);
    return article.save(data).then(() => { return true }).catch(() => { return false })
}

const getonearticle = (data) => {
    console.log('=============================');

    console.log(data);

    return articleModel.findById({ _id: data.id });
}

//删除文章
const deletarticle = (ids) => {
    console.log("ids=" + ids);
    return articleModel.deleteMany({ _id: { $in: ids } });
    //return userModle.deleteOne({ username })
}


//编辑文章
const editarticles = (data) => {
    console.log('====================================================');

    console.log(data);

    console.log('====================================================');

    return articleModel.updateOne({ _id: data._id }, { $set: { title: data.title, parentId: data.parentId, desc: data.desc, content: data.content,imgurl: upload+data.imgurl, creatat: new Date() } })
    /*  return articleModel.findOne({ _id: data._id }, function (err, doc) {
         doc.set({ title: data.title });
         doc.set({ parentId: data.parentId });
         doc.set({ desc: data.desc });
         doc.set({ content: data.content });
         doc.set({ creatat: new Date() });
         doc.save();
     }); */
}

//获取分页栏目
function getonecategory(_id, pageSize, currentPage, res) {
    let totalPage;
    let onecategory = { 'parentId': _id };//获取一个栏目文章
    if (_id == 'allCategroy') {//获取所有栏目文章
        onecategory = {}
    }
    articleModel.count(onecategory, (err, count) => {
        totalPage = count
    });
    articleModel.find(onecategory)
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ '_id': -1 })
        .exec(function (err, docs) {
            if (err) {
                res.send({
                    msg: '获取文章失败',
                    code: -1
                })
                return false
            }
            res.send({
                msg: '获取文章成功',
                code: 200,
                data: {
                    articles: docs
                },
                page: {
                    pageSize: pageSize,
                    currentPage: currentPage,
                    totalPage: totalPage
                }
            })
            return true
        });
}

module.exports = {
    articleModel,
    articlelist,
    addarticle,
    editarticles,
    deletarticle,
    newarticle,
    getonearticle
}