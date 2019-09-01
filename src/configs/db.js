require('dotenv').config()

const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "remotemysql.com",
    user: "b2Vvt6djbP",
    password: "Feh2gSe1qP",
    database: "b2Vvt6djbP"
})

module.exports = conn
