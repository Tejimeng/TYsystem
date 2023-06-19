// 此处定义登录和注册的路由处理函数
// 数据库模块
const db = require("../db/index")
// 加密模块
const bcrypt = require("bcryptjs")
// jwt的token模块
const jwt = require("jsonwebtoken")
// 
const config = require('../config')

// 用户注册的处理函数
exports.register = (req, res) => {
    const userinfo = req.body
    if (!userinfo.name || !userinfo.password) {
        return res.json({ status: 400, message: '用户名或密码为空!' })
    }
    // 查询SQL语句
    const sql = `select * from users where name =? `
    // 进行查询
    db.query(sql, [userinfo.name], (err, results) => {
        // 发生未知的错误，查询失败
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }
        // 查询成功，但是存在相同的用户名
        if (results.length > 0) {
            return res.status(400).json('用户名已存在，请更换用户名注册!')
        }
        // 符合注册的条件，将用户插入数据库
        // ①对用户的注册密码进行bcrype加密，随机盐的深度为10，即进行10次循环加密，返回值是加密后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 插入的SQL语句
        const sqlStr = 'insert into users set ?'
        // 进行用户的插入
        db.query(sqlStr, { name: userinfo.name, password: userinfo.password, identify: userinfo.identify, phone: userinfo.phone, regDate: Date() }, (err, results) => {
            // 发生未知的错误，插入失败
            if (err) {
                return res.send({
                    status: 400,
                    message: err.message
                })
            }
            // 数据库内部发生错误，没有成功插入
            if (results.affectedRows !== 1) {
                return res.status(400).json("服务器繁忙，请稍后再试！")
            }
            // 获取gravatar头像
            // const avatar=gravatar.url(req.body.email||"emerleite@gmail.com",{s:'200',r:'pg',d:'mm'})
            // 未发生问题
            res.json({
                // 状态码
                status: 200,
                // 注册的消息
                message: '注册成功',
                // 注册的姓名
                name: userinfo.name,
                // 注册的密码
                password: userinfo.password,
                // 注册的身份码
                identify: userinfo.identify,
                // 注册的手机号码
                phone: userinfo.phone,
                // 注册的日期
                regDate: Date(),
            })
        })
    })
}
// 用户登录的处理函数
exports.login=(req,res)=>{
    // 获取请求体报文
    const userinfo=req.body
    // 查询的SQL语句
    const sql=`select * from users where name = ?`
    // 进行查询
    db.query(sql,userinfo.name,(err,results)=>{
        // 发生未知的错误，查询失败
        if(err){
            return res.status(400).json(err)
        }
        // 查询成功，但是不存在此用户
        if(results.length!==1){
            return res.status(400).json("用户不存在！")
        }
        // 用户存在，对比用户的密码是否正确
        // 进行密码的对比
        const compareResult=bcrypt.compareSync(userinfo.password,results[0].password)
        // 密码输入错误
        if(!compareResult){
            return res.status(400).json("密码错误，请重新输入！")
        }
        // 生成JWT的Token字符串返回页面
        // ①剔除用户信息中的密码，采用的ES6中的Rest 操作符
        // user为获取到的用户信息，其中没有密码
        const user = {...results[0],password:''}
        // ②生成Token字符串
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{
            // 设置token的有效期为5个小时，过期需要重新进行身份验证
            expiresIn:'5h'
        })
        res.json({
            status:'200',
            message:"登录成功！",
            name:user.name,
            identify:user.identify,
            // 为了方便客户端使用Token，在服务器端直接拼接上Bearer的前缀
            token:'Bearer '+tokenStr
        })
    })
}