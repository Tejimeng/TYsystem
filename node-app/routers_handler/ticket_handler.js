const db = require("../db/index")
// 添加
exports.ticketAdd = (req, res) => {
    // temp为临时的存储对象
    const temp = {}
    // 一系列的信息判定
    if (req.body.username) temp.username = req.body.username
    if (req.body.venue) temp.venue = req.body.venue
    if (req.body.comInfo) temp.comInfo = req.body.comInfo
    if (req.body.ticketTime) temp.ticketTime = req.body.ticketTime
    if (req.body.comTime) temp.comTime = req.body.comTime
    if (req.body.seatInfo) temp.seatInfo = req.body.seatInfo
    if (req.body.ispay) temp.ispay = req.body.ispay
    // 查询是否存在用户
    db.query(`select * from user_info where name =?`, req.body.username, (err, results) => {
        // 发生未知的错误，查询失败
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }
        // 存在此用户的信息
        if (results.length > 0) {
            // 可以进行添加
            // 定义数据库插入语句
            const sql = `insert into ticketinfo set ?`
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
        }
        else{
            return res.status(200).json('暂无此用户信息！')
        }
    })
}
// 查询全部(基于管理员权限)
exports.ticketAll = (req, res) => {
    const sql = `select * from ticketinfo `
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('暂无购票信息！')
        res.json(results)
    })
}
// 查询单个用户的所有购票信息
exports.findOne = (req, res) => {
    const sql = `select * from ticketinfo where username =? `
    db.query(sql, req.params.username, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('暂无该用户的购票信息！')
        console.log(results);
        res.json(results)
    })
}
// 修改(根据id:基于一般用户和管理员权限)
exports.ticketEdit = (req, res) => {
    const temp = {}
    if (req.body.username) temp.username = req.body.username
    if (req.body.venue) temp.venue = req.body.venue
    if (req.body.comInfo) temp.comInfo = req.body.comInfo
    if (req.body.comTime) temp.comTime = req.body.comTime
    if (req.body.seatInfo) temp.seatInfo = req.body.seatInfo
    if (req.body.ispay) temp.ispay = req.body.ispay

    const sql = `update ticketinfo set ? where id = ?`
    db.query(sql, [temp, req.params.id], (err, results) => {
        // console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(temp)
    })
}
// 删除(根据id:管理员权限)
exports.ticketDelete = (req, res) => {
    const sql = 'delete from ticketinfo where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}


