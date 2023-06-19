// 创建服务器实例
const express =require('express')
const app=express()
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
// 引入其他的模块
    // body-parser用于获取请求体中的参数
const bodyParser=require('body-parser')
// 引入路由
const userlist=require("./routers/userlist")//引入用户列表路由
const users=require("./routers/users")// 引入登录与注册路由
const userinfo=require('./routers/userinfo')// 引入用户信息路由
const cominfo=require('./routers/cominfo')// 引入赛事信息路由
const venueinfo=require('./routers/venueinfo')//引入场馆信息的路由
const message=require("./routers/message")//引入留言信息的路由
const ticket=require("./routers/ticket")//引入购票信息的路由
// 服务器接口
// 测试接口
app.get('/',(req,res)=>{
    res.send("搭建服务器成功!")
})
// 中间件
// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 创建路由中间件
app.use("/userlist",userlist)//用户列表的中间件
app.use("/users",users)// 登录与注册的中间件
app.use("/userinfo",userinfo)// 管理用户信息的中间件
app.use("/cominfo",cominfo)// 管理赛事信息的中间件
app.use("/venueinfo",venueinfo)//场馆信息的中间件
app.use("/message",message)//留言信息的中间件
app.use("/ticket",ticket)//购票信息的中间件
// 服务器端口
const port =process.env.PORT||5555
// 监听服务
app.listen(port,()=>{
    console.log(`服务已经启动了，端口号为${port}`);
})
