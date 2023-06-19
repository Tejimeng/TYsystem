const express=require("express")
const router=express.Router()

// 导入路由函数处理模块
const usersHandler=require('../routers_handler/users_handler')
// $router GET:users/test
// @describe 返回请求的json数据
router.get("/test",(req,res)=>{
    res.json({msg:'login works!'})
})

// $router POST:users/login
// @describe 返回token jwt passport
router.post("/login",usersHandler.login)

// $router POST:users/register
// @describe 返回请求的json数据
router.post("/register",usersHandler.register)
// 向外暴露路由
module.exports=router