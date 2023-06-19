const express =require("express")
const router=express.Router()
const venueinfo_handler=require('../routers_handler/venueinfo_handler')
// 添加
router.post("/add",venueinfo_handler.venueAdd)
// 查询全部
router.get("/allVenues",venueinfo_handler.venueAll)
// 查询单个
router.get("/findOne/:id",venueinfo_handler.findOne)
// 编辑(根据id)
router.post('/edit/:id', venueinfo_handler.venueEdit)
// 删除(根据id)
router.post('/delete/:id', venueinfo_handler.venueDelete)

// 向外暴露
module.exports=router