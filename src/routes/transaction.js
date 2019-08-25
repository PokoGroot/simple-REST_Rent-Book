const express = require('express')
const Route = express.Router()

const transactionController = require('../controllers/transaction')

Route
    .patch('/', transactionController.returnBook)
    .post('/', transactionController.rentBook)

module.exports = Route