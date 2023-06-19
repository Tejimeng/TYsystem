const express =require("express")
const router=express.Router()
const userinfo_handler=require('../routers_handler/userinfo_handler')
// 添加
router.post("/add",userinfo_handler.userAdd)
// 查询全部数据
router.get("/allUsers",userinfo_handler.userAll)
// 查询个人的信息
router.get("/oneUser/:name",userinfo_handler.userOne)
// 编辑(根据id)
router.post('/edit/:id', userinfo_handler.userEdit)
// 删除(根据id)
router.post('/delete/:id', userinfo_handler.userDelete)
// 删除(根据用户名)
router.post('/delete_name/:name', userinfo_handler.userDelete_name)
// 向外暴露
module.exports=router