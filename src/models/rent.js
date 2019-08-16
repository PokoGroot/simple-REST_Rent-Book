const conn = require('../configs/db')

module.exports = {
    //insert rent transaction detail
    insertTrans: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT transaction SET ?',
            data,
            (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
            })
        })
    }
}