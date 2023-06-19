const db = require("../db/index")
// 添加
exports.comAdd = (req, res) => {
    // temp为临时的存储对象
    const temp = {}
    // 一系列的信息判定
    if (req.body.name) temp.name = req.body.name
    if (req.body.comType) temp.comType = req.body.comType
    if (req.body.organizer) temp.organizer = req.body.organizer
    if (req.body.participant) temp.participant = req.body.participant
    if (req.body.comTime) temp.comTime = req.body.comTime
    if (req.body.comLocation) temp.comLocation = req.body.comLocation
    if (req.body.comResult) temp.comResult = req.body.comResult || '暂无'
    if (req.body.vipPrice) temp.vipPrice = req.body.vipPrice
    if (req.body.standardPrice) temp.standardPrice = req.body.standardPrice
    if (req.body.lowPrice) temp.lowPrice = req.body.lowPrice
    if (req.body.psTime) temp.psTime = req.body.psTime
    if (req.body.peTime) temp.peTime = req.body.peTime
    if (req.body.state) temp.state = req.body.peTime
    if (req.body.placard) temp.placard = req.body.placard
    // 查询是否存在此赛事
    db.query(`select * from commanage where name =?`, req.body.name, (err, results) => {
        // 发生未知的错误，查询失败
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }
        // 已经存在
        if (results.length > 0) {
            return res.status(400).json('赛事已经存在，无法重复添加!')
        }
        // 可以进行添加
        // 定义数据库插入语句
        const sql = `insert into commanage set ?`
        db.query(sql, temp, (err, results) => {
            // 发生未知错误
            if (err) {
                return res.status(400).json(err)
            }
            // 数据库插入失败
            if (results.affectedRows !== 1) {
                return res.status(400).json("系统繁忙，请稍后再试！")
            }
            // 成功
            res.json(temp)
        })
    })
}
// 查询
exports.comAll = (req, res) => {
    const sql = `select * from commanage order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('暂无比赛数据！')
        res.json(results)
    })
}
// 修改(根据id)
exports.comEdit = (req, res) => {
    const temp = {}
    if (req.body.name) temp.name = req.body.name
    if (req.body.comType) temp.comType = req.body.comType
    if (req.body.organizer) temp.organizer = req.body.organizer
    if (req.body.participant) temp.participant = req.body.participant
    if (req.body.comTime) temp.comTime = req.body.comTime
    if (req.body.comLocation) temp.comLocation = req.body.comLocation
    if (req.body.comResult) temp.comResult = req.body.comResult || '暂无'
    if (req.body.vipPrice) temp.vipPrice = req.body.vipPrice
    if (req.body.standardPrice) temp.standardPrice = req.body.standardPrice
    if (req.body.lowPrice) temp.lowPrice = req.body.lowPrice
    if (req.body.psTime) temp.psTime = req.body.psTime
    if (req.body.peTime) temp.peTime = req.body.peTime
    if (req.body.state) temp.state = req.body.peTime
    if (req.body.placard) temp.placard = req.body.placard
    const sql = `update commanage set ? where id = ?`
    db.query(sql, [temp, req.params.id], (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(temp)
    })
}
// 删除(根据id)
exports.comDelete = (req, res) => {
    const sql = 'delete from commanage where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}


