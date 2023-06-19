const express =require("express")
const router=express.Router()
const userlist_handler=require('../routers_handler/userlist_handler')
// 添加
// router.post("/add",userinfo_handler.userAdd)
// 查询全部数据
router.get("/allUsers",userlist_handler.userAll)
// 编辑(根据id)
router.post('/edit/:id', userlist_handler.userEdit)
// 删除(根据id)
router.post('/delete/:id', userlist_handler.userDelete)

// 向外暴露
module.exports=router