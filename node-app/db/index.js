// 导入mysql数据库模块
const mysql = require("mysql")
// 创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'huhaohui',
    database: 'tiyudatabase'
})
// 向外暴露数据库连接对象
module.exports = db