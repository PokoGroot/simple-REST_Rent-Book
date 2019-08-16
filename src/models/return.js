const conn = require('../configs/db')

module.exports = {
    //update return transaction detail
    getLatestBorrowing: (id) => {
        return new Promise((resolve, reject) => {
          conn.query('SELECT * FROM transaction WHERE book_id = ? AND return_date IS NULL',
            id,
            (err, result) => {
                if (err){ 
                    reject(err)
                } else { 
                    resolve(result)
                }
            })
        })
    },
    returnBook: (id, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE transaction SET ? where trans_id = ?',
            [data, id],
            (err, result) => {
                if (err){
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}