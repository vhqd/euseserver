var mongoose = require('mongoose')
/* mongoose.set('useCreatIndex', true) */

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    islock: Boolean
})

var userModle = mongoose.model('user', userSchema)
/* userModle.createIndexes() */

var userlist = () => {
    return userModle.find()
}

module.exports = {
    userlist
}