require('dotenv').config()

const mysql = require('mysql')

const conn = mysql.createConnection({
    // host: "remotemysql.com",
    // user: "b2Vvt6djbP",
    // password: "Feh2gSe1qP",
    // database: "b2Vvt6djbP"
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

module.exports = conn
