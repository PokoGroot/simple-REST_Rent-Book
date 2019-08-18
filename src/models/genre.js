const conn = require('../configs/db')

module.exports = {
    //get all genre on database
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
    //add genre to database
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
    //update genre
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
    //delete genre from database
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