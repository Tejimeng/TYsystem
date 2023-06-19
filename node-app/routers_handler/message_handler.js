const db = require("../db/index")
// 添加
exports.messageAdd = (req, res) => {
    // temp为临时的存储对象
    const temp = {}
    // 一系列的信息判定
    if (req.body.name) temp.name = req.body.name
    if (req.body.message) temp.message = req.body.message
    if (req.body.comname) temp.comname = req.body.comname
    if (req.body.messagetime) temp.messagetime = req.body.messagetime
    // 查询是否存在此用户
    db.query(`select * from users where name =?`, req.body.name, (err, results) => {
        // 发生未知的错误，查询失败
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }
        if (results.length === 0) {
            return res.status(400).json('用户不存在，请先注册!')
        }

        // 定义数据库插入语句
        const sql = `insert into usermessage set ?`
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
exports.messageAll = (req, res) => {
    const sql = `select * from usermessage order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}
// 查询单个赛事(根据比赛的名称)
exports.messageOne = (req, res) => {
    const sql = `select * from usermessage where comname = ? order by id desc`
    db.query(sql, req.params.name, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json(false)
        res.json(results)
    })
}
// 查询单条留言(根据id)
exports.messageOne_id = (req, res) => {
    const sql = `select * from usermessage where id = ?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('没有这个赛事的相关评论哦😁！')
        res.json(results)
    })
}
// 修改(根据id)
exports.messageEdit = (req, res) => {
    const temp = {}
    if (req.body.name) temp.name = req.body.name
    if (req.body.message) temp.message = req.body.message
    if (req.body.comname) temp.comname = req.body.comname
    if (req.body.messagetime) temp.messagetime = req.body.messagetime
    const sql = `update usermessage set ? where id = ?`
    db.query(sql, [temp, req.params.id], (err, results) => {
        console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(temp)
    })
}
// 删除(根据id)
exports.messageDelete = (req, res) => {
    const sql = 'delete from usermessage where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}


