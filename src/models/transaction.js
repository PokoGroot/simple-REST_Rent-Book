const conn = require('../configs/db')

module.exports = {
    //get transaction detail from latest book
    getLatestRent: (id) => {
        return new Promise((resolve, reject) => {
          conn.query('SELECT * FROM transaction WHERE book_id = ? AND return_date IS NULL',
            id,
            (err, result) => {
                if (!err){ 
                    resolve(result)
                } else { 
                    reject(err)
                }
            })
        })
    },
    //update return transaction detail
    returnBook: (id, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE transaction SET ? where trans_id = ?',
            [data, id],
            (err, result) => {
                if (!err){
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    //insert rent transaction detail
    insertTrans: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT transaction SET ?',
            data,
            (err, result) => {
                if (!err) { 
                    resolve(result) 
                } else { 
                    reject(err) 
                }
            })
        })
    }
}