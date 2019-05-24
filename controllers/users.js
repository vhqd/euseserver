const userModel = require('../models/users')
const { setCrypto } = require('../untils/base')
const token = require('../untils/token')

//用户登录
const login = async (req, res, next) => {
    let { username, password } = req.body;
    let user = await userModel.findLogin({
        username,
        password: setCrypto(password)
    });
    if (user) {
        let newtoken = token.createToken();
        req.session.token = newtoken;
        console.log(newtoken);
        res.send({
            msg: '登录成功',
            user:{
                username:username
            },
            token:newtoken,
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

//添加用户
const adduser = async (req, res, next) => {
    let { username, password } = req.body;
    console.log(username, password);

    if (username == '' || password == '') {
        res.send({
            msg: '用户名或者密码不能为空',
            code: -1
        })
        return;
    }
    let adduser = await userModel.adduser({ username: username, password: setCrypto(password) });
    if (adduser) {
        res.send({
            msg: '添加用户成功',
            code: 200
        })
    } else {
        res.send({
            msg: "添加用户失败",
            code: -1
        })
    }
}

//编辑用户
const edituser = async (req, res, next) => {
    let datas = req.body
    let edit = await userModel.edituser(datas)
    if (edit) {
        res.send({
            msg: '编辑用户成功',
            code: 200
        })
    } else {
        res.send({
            msg: "编辑用户失败",
            code: -1
        })
    }
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
const deleteuser = async (req, res, next) => {
    //let { username , _id } = req.body;
    let datas = req.body;
    let ids = [];
    datas.forEach(v => {
        ids.push(v._id)
    });

    let user = await userModel.deleteuser(ids);
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
    edituser,
    adduser,
    userlist,
    deleteuser
}