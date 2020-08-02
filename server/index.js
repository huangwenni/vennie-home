const express = require('express')
const app = express()

const adminRouter = require('./routes/admin/index')
const loginRouter = require('./routes/admin/login')
const webRouter = require('./routes/web/web')

app.use(require('cors')())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/public/admin'))
app.use('/', express.static(__dirname + '/public/web'))

//中间件
const {setModel, setSecret, isLogin} = require('./routes/admin/middleware/middleware')

//接口
app.use('/admin/api/crud/:resource', setModel(), setSecret(), isLogin(), adminRouter)
app.use('/admin/api/login', setSecret(), loginRouter)
app.use('/web/api/:resource',setModel(),webRouter)

//连接数据库
require('./db/connect')()

//错误处理
app.use(async (err, req, res, next) => {
    res.status(err.status || 500).send({
        msg: err.message
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})