const categoryModel = require('../models/category')

//根据顶级栏目获取子栏目和文章
const getShowCate = async (req, res, next) => {
    let data = req.body
    let cate = await categoryModel.getShowCate(data)
    if (cate) {
        res.send({
            msg: '获取成功',
            code: 200,
            data:{
                category:cate
            }
        })
    } else {
        res.send({
            msg: '获取失败',
            code: -1
        })
    }
}

//返回所有栏目列表
const getCateAll= async (req, res, next) => {
    let cate = await categoryModel.getCateAll();
    for(let i = 0 ; i < cate.length ; i++){
        if(cate[i].children.length > 0){
           let children = cate[i].children;
           for(let j = 0 ; j < children.length ; j++){
                let id = children[j]['_id'];
                let childdata = await categoryModel.getcate({id:id});
                children[j]['children'] = childdata;
           }
        }
    }
    if (cate) {
        res.send({
            msg: '获取成功',
            code: 200,
            data:{
                category:cate
            }
        })
    } else {
        res.send({
            msg: '获取失败',
            code: -1
        })
    }
}

//获取所有栏目
const category = async (req, res, next) => {
    let categorys = await categoryModel.categorylist();
    /* console.log("所有栏目"+categorys); */
    if (categorys) {
        let newdata = await initCategory(categorys);
        let newdata1 = await initCategory(categorys);

        for (let i = 0; i < newdata1.length; i++) {
            if (newdata1[i].parentId) {
                let parentId = newdata1[i].parentId;
                let parent = await categoryModel.getParent(parentId);
                newdata1[i].parent = parent;
            }
        }

        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                category: newdata1
            }
        })
    } else {
        res.send({
            msg: '获取栏目失败',
            code: -1
        })
    }
}

const getcate = async (req, res, next) => {
    let data = req.body
    let categorys = await categoryModel.getcate(data);
    if (categorys) {
        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                category: categorys
            }
        })
    } else {
        res.send({
            msg: '添加栏目失败',
            code: -1
        })
    }
}

const getlevel = async (req, res, next) => {
    let categorys = await categoryModel.getLevel(2);
    if (categorys) {
        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                category: categorys
            }
        })
    } else {
        res.send({
            msg: '获取栏目失败',
            code: -1
        })
    }
}

const getLevelTwo = async (req, res, next) => {
    let categorys = await categoryModel.getCateAll();
    if (categorys) {
        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                category: categorys
            }
        })
    } else {
        res.send({
            msg: '获取栏目失败',
            code: -1
        })
    }
}

const getLevelThree = async (req, res, next) => {
    let categorys = await categoryModel.getLevelThree(2);
    if (categorys) {
        res.send({
            msg: '获取栏目成功',
            code: 200,
            data: {
                category: categorys
            }
        })
    } else {
        res.send({
            msg: '获取栏目失败',
            code: -1
        })
    }
}

//添加栏目
const addcategory = async (req, res, next) => {
    let data = req.body
    let addcate = await categoryModel.addcategory(data)
    if (addcate) {
        res.send({
            msg: '添加栏目成功',
            code: 200
        })
    } else {
        res.send({
            msg: '添加栏目失败',
            code: -1
        })
    }
}

//删除栏目
const deletecategory = async (req, res, next) => {
    let datas = req.body;
    let ids = [];
    datas.forEach(v => {
        ids.push(v._id)
    });
    console.log(ids);

    let deledata = await categoryModel.deletecategory(ids);
    if (deledata) {
        res.send({
            msg: '删除栏目成功',
            code: 200
        })
    } else {
        res.send({
            msg: '删除栏目失败',
            code: -1
        })
    }
}

//编辑栏目
const editcategory = async (req, res, next) => {
    let datas = req.body;
    let editdata = await categoryModel.editcategory(datas);
    if (editdata) {
        res.send({
            msg: '编辑栏目成功',
            code: 200
        })
    } else {
        res.send({
            msg: '编辑栏目失败',
            code: -1
        })
    }
}

//将子栏目处理到父级栏目children属性里面
function initCategory(datas) {
    datas.forEach((v, k) => {
        let children = [];
        if (v.isparent || v.parentId) {
            datas.forEach((sv, sk) => {
                if (sv.parentId != undefined && (sv.parentId == v._id)) {
                    children.push(sv)
                }
            });
            if (children.length > 0) {
                v['children'] = JSON.stringify(children);
            }
        }
    })
    return datas;
}

module.exports = {
    getCateAll,
    category,
    deletecategory,
    addcategory,
    editcategory,
    getlevel,
    getcate,
    getShowCate,
    getLevelTwo,
    getLevelThree
}
