const express =require("express")
const router=express.Router()
const message_handler=require('../routers_handler/message_handler')
// 添加
router.post("/add",message_handler.messageAdd)
// 查询全部数据
router.get("/allmessage",message_handler.messageAll)
// 查询单个赛事
router.get("/onemessage/:name",message_handler.messageOne)
// 编辑(根据id)
router.post('/edit/:id', message_handler.messageEdit)
// 删除(根据id)
router.post('/delete/:id', message_handler.messageDelete)

// 向外暴露
module.exports=router