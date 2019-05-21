const mongoose = require('mongoose')
/* mongoose.set('useCreatIndex', true) */

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    islock: Boolean
})

const userModle = mongoose.model('user', userSchema)
/* userModle.createIndexes() */

const findLogin = (data)=>{
    return userModle.findOne(data)
}
const userlist = () => {
    return userModle.find()
}

module.exports = {
    findLogin,
    userlist
}