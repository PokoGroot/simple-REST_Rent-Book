require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const BookRoute = require('./src/routes/book')
const GenreRoute = require('./src/routes/genre')
const rentRoute = require('./src/routes/rent')
const returnRoute = require('./src/routes/return')

const port = process.env.SERVER_PORT || 3000

//port declaration
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/book', BookRoute)
app.use('/genre', GenreRoute)
app.use('/rent', rentRoute)
app.use('/return', returnRoute)

//body-parser, nodemon, mysql, express, morgan, dotenv