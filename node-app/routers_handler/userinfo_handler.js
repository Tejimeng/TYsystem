const db = require("../db/index")
// 添加
exports.userAdd = (req, res) => {
    // temp为临时的存储对象
    const temp = {}
    if (req.body.name) {
        temp.name = req.body.name
        temp.age = req.body.age || "0"
        temp.addr = req.body.addr || "暂无"
        temp.birth = req.body.birth || "暂无"
        temp.sex = req.body.sex || "暂无"
        
    }
    // // 查询是否存在此用户
    // db.query(`select * from users where name =?`, req.body.name, (err, results) => {
    //     // 发生未知的错误，查询失败
    //     if (err) {
    //         return res.send({
    //             status: 404,
    //             message: err.message
    //         })
    //     }
    //     if (results.length === 0) {
    //         return res.status(400).json('用户不存在，请先注册!')
    //     }
    // })
    // 查询用户信息表中是否存在相同的用户
    db.query(`select * from user_info where name = ? `, req.body.name, (err, results) => {
        // 发生未知的错误，查询失败
        if (err) {
            return res.send({
                status: 404,
                message: err.message
            })
        }
        // 插入的用户已经存在
        if (results.length > 0) {
            return res.status(400).json('用户名已存在，无法重复添加!')
        }
        // 定义数据库插入语句
        const sql = `insert into user_info set ?`
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
exports.userAll = (req, res) => {
    const sql = `select * from user_info order by id desc`
    db.query(sql, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}
// 查询单个用户的信息
exports.userOne = (req, res) => {
    const sql = `select * from user_info where name = ?`
    db.query(sql, req.params.name, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.length === 0) return res.status(200).json('查无数据')
        res.json(results)
    })
}
// 修改(根据id)
exports.userEdit = (req, res) => {
    const temp = {}
    if (req.body.name) temp.name = req.body.name
    if (req.body.addr) temp.addr = req.body.addr
    if (req.body.age) temp.age = req.body.age
    if (req.body.birth) temp.birth = req.body.birth
    if (req.body.sex) temp.sex = req.body.sex
    if (req.body.avatar) temp.avatar = req.body.avatar
    
    const sql = `update user_info set ? where id = ?`
    db.query(sql, [temp, req.params.id], (err, results) => {
        // console.log(req.params.id)
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('编辑失败')
        res.json(temp)
    })
}
// 删除(根据id)
exports.userDelete = (req, res) => {
    const sql = 'delete from user_info where id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(400).json('删除失败')
        res.json('删除成功')
    })
}
// 删除(根据用户名)
exports.userDelete_name = (req, res) => {
    const sql = 'delete from user_info where name = ?'
    db.query(sql, req.params.name, (err, results) => {
        if (err) return res.status(400).json(err)
        if (results.affectedRows !== 1) return res.status(401).json('删除失败')
        res.json('删除成功')
    })
}


