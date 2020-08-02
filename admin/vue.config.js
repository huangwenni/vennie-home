module.exports = {
    //指定输出的文件夹
    outputDir: '__dirname' + '/../../server/public/admin',
    // 生产环境下使用/admin/，指定静态文件的输出路径
    publicPath: process.env.NODE_ENV === 'production'
        ? '/admin/'
        : '/'
}