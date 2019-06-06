const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    categoryname: String,
    desc: String,
    creatat: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: Schema.Types.ObjectId,
    },
    isparent: { type: Boolean, default: false },
    parents: String,
    parent: [],
    level: Number,
    children: String,
    sort: { type: Number, default: 1 },
})


const categoryModel = mongoose.model("categorys", categorySchema);

const getShowCate = (data) => {
    return categoryModel.aggregate([
        {
            $lookup: {
                from: 'articles',
                localField: '_id',
                foreignField: 'parentId',
                as: 'subMenu'
            }
        },
        {
            $match: {parentId: mongoose.Types.ObjectId(data.id) }
        }
    ])
}

//获取三级栏目和文章树
const getCateAll = () => {
    return categoryModel.aggregate([
        {
            $lookup: {
                from: 'categorys',
                localField: '_id',
                foreignField: 'parentId',
                as: 'children'
            }
        },
        {
            $match: {isparent: true }
        }
    ])
}

//获取二级栏目和三级栏目树
const getLevelThree = (level) => {
    return categoryModel.aggregate([
        {
            $lookup: {
                from: 'categorys',
                localField: '_id',
                foreignField: 'parentId',
                as: 'children'
            }
        },
        {
            $match: {level: level }
        }
    ])
}

//获取所有栏目列表
const categorylist = () => {
    return categoryModel.find();
}

//获取顶级栏目
const getParents = () => {
    return categoryModel.find({ isparent: true })
}

//获取二级栏目
const getLevel = (level) => {
    return categoryModel.find({ level: level }).limit(5)
}

//根据父级id获取栏目
const getcate = (data) => {
    return categoryModel.find({ parentId: data.id })
}

//根据parentId获取栏目
const getParent = (id) => {
    return categoryModel.findOne({ _id: id });
}

//添加栏目
const addcategory = (data) => {
    let cate = new categoryModel(data)
    return cate.save(data).then(() => { return true }).catch(() => { return false })
}

//删除栏目
const deletecategory = (ids) => {
    console.log("ids==" + ids);
    return categoryModel.deleteMany({ _id: { $in: ids } })
}

//更新编辑栏目
const editcategory = (data) => {
    return categoryModel.updateOne(
        { _id: data._id },
        { $set: { categoryname: data.categoryname, isparent: data.isparent, parentId: data.parentId, desc: data.desc, creatat: new Date() } }
    )
}

module.exports = {
    getCateAll,
    categorylist,
    deletecategory,
    addcategory,
    editcategory,
    getParent,
    getParents,
    getLevel,
    getcate,
    getShowCate,
    getLevelThree
}