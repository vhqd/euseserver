const categoryModel = require('../models/category')

//获取所有栏目
const category = async (req, res, next) => {
    let categorys = await categoryModel.categorylist();
    /* console.log("所有栏目"+categorys); */
    
    if (categorys) {
        let newdata = await initCategory(categorys);
        let newdata1 = await initCategory(categorys);

        for(let i =0 ; i < newdata1.length ; i++){
            if(newdata1[i].parentId){
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
    category,
    deletecategory,
    addcategory,
    editcategory
}
