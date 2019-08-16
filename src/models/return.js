const conn = require('../configs/db')

module.exports = {
    //update return transaction detail
    bookReturn: (data, id) => { 
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE transaction SET ? WHERE book_id = ?`),
            [data, id],
            (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            }
        })
    }
}