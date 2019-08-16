const conn = require('../configs/db')

module.exports = {
    getGenre: () => {
        return new Promise((resolve, reject) => {
            conn.query(` SELECT * FROM genre `,
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    addGenre: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(` INSERT genre SET ? `, 
            data, 
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateGenre: (name, id) => {
        return new Promise((resolve, reject) => {
            conn.query(` UPDATE genre SET ? WHERE genre_id = ? `,
            [name, id],
            (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    deleteGenre: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(` DELETE FROM genre WHERE genre_id = ?`,
            id,
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