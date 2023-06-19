const express =require("express")
const router=express.Router()
const cominfo_handler=require('../routers_handler/cominfo_handler')
// 添加
router.post("/add",cominfo_handler.comAdd)
// 查询
router.get("/allComs",cominfo_handler.comAll)
// 编辑(根据id)
router.post('/edit/:id', cominfo_handler.comEdit)
// 删除(根据id)
router.post('/delete/:id', cominfo_handler.comDelete)

// 向外暴露
module.exports=router