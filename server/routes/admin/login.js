const express = require('express')
const router = express.Router()
const User = require('../../db/db').AdminUser
const jwt = require('jsonwebtoken')
const assert = require('http-assert')

router.post('/', async (req, res, next) => {
    const { userName, password } = req.body
    //根据用户名找用户
    //取出password，在模型默认取不到
    const user = await User.findOne({ userName }).select('+password')
    assert(user, 422, '用户不存在')
    //校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    //生成token返回
    const token = jwt.sign({ id: user._id }, req.secret)
    res.send({
        msg: '登陆成功',
        token
    })
})

module.exports = router