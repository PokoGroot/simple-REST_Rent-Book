const conn = require('../configs/db')

module.exports = {
    registerUser: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT user SET ?',
            data,
            (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
            })
        })
    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM user WHERE email = ? AND password = ?',
            [email, password],
            (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
            })
        })
    },
    getAllUsersWithEmailOrUsername: (email, username) => {
            return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE email = ? OR username = ?`,
            [email, username],
            (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
            })
        })
    },
    getAllUsers: (keyword = null, sort = null, dataBegin, pageLimit) => {
            return new Promise((resolve, reject) => {
            let query = `SELECT id, username, email, level FROM user `

            query += keyword != null ? `WHERE usename LIKE %${keyword}% ` : ''
            query += sort != null ? `ORDER BY ${sort} ` : ''

            conn.query(`${query} LIMIT ?, ?`,
            [dataBegin, pageLimit],
            (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
            })
        })
    },
    getOneUser: (id) => {
            return new Promise((resolve, reject) => {
            conn.query('SELECT id, username, email, level FROM users WHERE id = ?',
            id,
            (err, result) => {
                if (err) { reject(err) } else { resolve(result) }
            })
        })
    }
}