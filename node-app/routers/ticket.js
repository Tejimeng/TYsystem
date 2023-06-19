const express =require("express")
const router=express.Router()
const ticket_handler=require('../routers_handler/ticket_handler')
// 添加
router.post("/add",ticket_handler.ticketAdd)
// 查询全部
router.get("/alltickets",ticket_handler.ticketAll)
// 查询单个
router.get("/findOne/:username",ticket_handler.findOne)
// 编辑(根据id)
router.post('/edit/:id', ticket_handler.ticketEdit)
// 删除(根据id)
router.post('/delete/:id', ticket_handler.ticketDelete)

// 向外暴露
module.exports=router