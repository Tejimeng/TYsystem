const db = require("../db/index")
// 添加
exports.venueAdd = (req, res) => {
    // temp为临时的存储对象
    const temp = {}
    // 一系列的信息判定
    if (req.body.name) temp.name = req.body.name
    if (req.body.location) temp.location = req.body.location
    if (req.body.seatinfo) temp.seatinfo = req.body.seatinfo
    if (req.body.vipSeat) temp.vipSeat = req.body.vipSeat
    if (req.body.standardSeat) temp.standardSeat = req.body.standardSeat
    if (req.body.lowSeat) temp.lowSeat = req.body.lowSeat
    if (req.body.remarks) temp.remarks = req.body.remarks
    if (req.body.placard) temp.placard = req.body.placard
    // 查询是否存在此场馆
    db.query(`select * from venue where name =?`, req.body.name, (err, results) => {
        // 发生未知的错误，查询失败
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }
        // 已经存在
        if (results.length > 0) {
            return res.status(400).json('场馆已经存在，无法重复添加!')
        }
        // 可以进行添加
        // 定义数据库插入语句
        const sql = `insert into venue set ?`
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
// 查询全部
exports.venueAll = (req, res) => {
    const sql = `select * from venue order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('暂无场馆信息！')
        res.json(results)
    })
}
// 查询一个(根据id)
exports.findOne = (req, res) => {
    const sql = `select * from venue where id =? `
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('暂无场馆信息！')
        res.json(results)
    })
}
// 修改(根据id)
exports.venueEdit = (req, res) => {
    const temp = {}
    if (req.body.name) temp.name = req.body.name
    if (req.body.location) temp.location = req.body.location
    if (req.body.seatinfo) temp.seatinfo = req.body.seatinfo
    if (req.body.placard) temp.placard = req.body.placard
    const sql = `update venue set ? where id = ?`
    db.query(sql, [temp, req.params.id], (err, results) => {
        // console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(temp)
    })
}
// 删除(根据id)
exports.venueDelete = (req, res) => {
    const sql = 'delete from venue where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}


