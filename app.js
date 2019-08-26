require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const BookRoute = require('./src/routes/book')
const GenreRoute = require('./src/routes/genre')
const TransactionRoute = require('./src/routes/transaction')
const UserRoute = require('./src/routes/user')

const port = process.env.SERVER_PORT || 3000

//port declaration
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/book', BookRoute)
app.use('/genre', GenreRoute)
app.use('/trans', TransactionRoute)
app.use('/user', UserRoute)

//body-parser, nodemon, mysql, express, morgan, dotenv, prettier, eslint