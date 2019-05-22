const mongoose = require('mongoose')
/* mongoose.set('useCreatIndex', true) */

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    islock: Boolean,
    isadmin: Boolean,
    creatat: Number
})

const userModle = mongoose.model('users', userSchema)
/* userModle.createIndexes() */

const findLogin = (data) => {
    return userModle.findOne(data)
}
const userlist = () => {
    return userModle.find()
}

const deleteuser = (username) => {
    console.log(username);
    return userModle.deleteOne({ username })
}

module.exports = {
    findLogin,
    userlist,
    deleteuser
}