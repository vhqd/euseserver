var userModel = require('../models/users')

var login = async (req, res, next) => {
    res.send({
        msg: '测试',
        code: 200
    })
}

var logout = async (req, res, next) => {
    res.send({
        msg: '退出',
        code: 200
    })
}

var userlist = async (req, res, next) => {
    let users = await userModel.userlist()
    if (users) {
        res.send({
            msg: '所有用户',
            code: 200,
            data: {
                userlist: users
            }
        })
    } else {
        res.send({
            msg: '获取用户失败',
            code: -1
        })
    }
}

module.exports = {
    login,
    logout,
    userlist
}