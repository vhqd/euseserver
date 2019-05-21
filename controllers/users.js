const userModel = require('../models/users')
const { setCrypto } = require('../untils/base')

//用户登录
const login = async (req, res, next) => {
    let { username, password } = req.body;
    let user = await userModel.findLogin({
        username,
        password: setCrypto(password)
    });
    if (user) {
        res.send({
            msg: '登录成功',
            code: 200
        })
    } else {
        res.send({
            msg: '登录失败',
            code: -1
        })
    }
}

//用户登出
const logout = async (req, res, next) => {
    res.send({
        msg: '退出',
        code: 200
    })
}

//获取所有用户列表
const userlist = async (req, res, next) => {
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

//删除用户
const deleteoneuser = async (req, res, next) => {
    let { username } = req.body;
    let user = await userModel.deleteuser(username);
    if (user) {
        res.send({
            msg: '删除用户成功',
            code: 200
        })
    } else {
        res.send({
            msg: '删除用户失败',
            code: -1
        })
    }
}

module.exports = {
    login,
    logout,
    userlist,
    deleteoneuser
}