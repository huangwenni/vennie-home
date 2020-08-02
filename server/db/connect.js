module.exports = () => {
    //连接数据库
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/vennie', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.on('connected', () => {
        console.log('数据库连接成功');
    });
    mongoose.connection.on('error', () => {
        console.log('数据库连接失败');
    });
    mongoose.connection.on('disconnected', () => {
        console.log('数据库连接断开')
    });
}
