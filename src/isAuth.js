const {verify} = require('jsonwebtoken')

const isAuth = req => {
    const authorization = req.header['authorization'];
    if (!authorization) throw new Error("You need to login")
    // 'Bearer sskjdkjgkhgk359087897987'
    const token = authorization.split(' ')[1];
    const {userId} = verfity(token, process.env.ACCESS_TOKEN_SECRET);
    return userId
}

module.exports = {
    isAuth
}