const express = require('express')
const Route = express.Router()

const returnController = require('../controllers/return')

Route
    .patch('/:book_id', returnController.returnBook)

module.exports = Route