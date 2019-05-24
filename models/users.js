const mongoose = require('mongoose')
/* mongoose.set('useCreatIndex', true) */

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    islock: { type: Boolean, default: false },
    isadmin: { type: Boolean, default: false },
    creatat: {
        type: Date,
        default: Date.now
    }
})

const userModle = mongoose.model('user', userSchema)
/* userModle.createIndexes() */

//用户登录
const findLogin = (data) => {
    return userModle.findOne(data)
}

//添加用户
const adduser = (data) => {
    console.log("data" + data);
    let user = new userModle(data)
    return user.save(data).then(() => { return true }).catch(() => { return false })
}

//编辑用户
const edituser = (data) => {
    return userModle.updateOne({ _id: data._id }, { $set: { username: data.username, password: data.password ,creatat: new Date()} })
}

//获取所有用户
const userlist = () => {
    return userModle.find()
}

//删除用户
const deleteuser = (ids) => {
    console.log("ids=" + ids);
    return userModle.deleteMany({ _id: { $in: ids } });
    //return userModle.deleteOne({ username })
}

module.exports = {
    findLogin,
    adduser,
    edituser,
    userlist,
    deleteuser
}