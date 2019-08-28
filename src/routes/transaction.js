const express = require('express')
const Route = express.Router()

const TransactionController = require('../controllers/transaction')
const Auth = require('../middleware/auth')

Route
    //get latest borrow by ID
    .patch('/', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, TransactionController.returnBook)
    .post('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.rentBook)
    .get('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.getAllBorrowing)
    .get('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.getOneBorrowing)
    .delete('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.deleteBorrowing)

module.exports = Route