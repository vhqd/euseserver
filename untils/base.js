const crypto = require('crypto');

const secret = 'sadf247^@&*!';

//密码加密
const setCrypto = (str) => {
    return crypto.createHmac('sha256', secret)
        .update(str)
        .digest('hex');
}

//获取时间
const getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}

module.exports = {
    setCrypto,
    getNowFormatDate
}