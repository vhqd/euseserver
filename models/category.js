const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryname: String,
    desc: String,
    creatat: String,
    parentId: String,
    isparent: Boolean,
    sort: Number
})

const categoryModel = mongoose.model("categorys", categorySchema);

const categorylist = () => {
    return categoryModel.find();
}

module.exports = {
    categorylist
}