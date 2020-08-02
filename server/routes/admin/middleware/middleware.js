//中间件
const jwt = require('jsonwebtoken')
const User = require('../../../db/db').AdminUser
const assert = require('http-assert')

//指定Model
exports.setModel = () => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require('../../../db/db')[modelName]
        next()
    }
}
//设置秘钥
exports.setSecret = () => {
    return async (req, res, next) => {
        req.secret = 'vennie'
        next()
    }
}
//判断是否登录
exports.isLogin = () => {
    return async (req, res, next) => {
        assert(req.headers.authorization, 401, '请先登录')
        const token = String(req.headers.authorization).split(' ').pop()
        //vertify解开token
        const tokenData = jwt.verify(token, req.secret)
        //为防止伪造，需要在数据库中查询是否有该用户
        const user = await User.findById(tokenData.id)
        assert(user, 401, '请先登录')
        next()
    }
}

