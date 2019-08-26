const express = require('express')
const Route = express.Router()

const TransactionController = require('../controllers/transaction')

Route
    //get all trans, get one trans, get latest borrow by ID, delete borrow
    .patch('/', TransactionController.returnBook)
    .post('/', TransactionController.rentBook)
    .get('/', TransactionController.getAllBorrowing)
    .get('/:id', TransactionController.getOneBorrowing)
    .delete('/:id', TransactionController.deleteBorrowing)

module.exports = Route