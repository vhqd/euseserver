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

module.exports = {
    login,
    logout
}