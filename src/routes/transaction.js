const express = require('express')
const Route = express.Router()

const TransactionController = require('../controllers/transaction')
const Auth = require('../middleware/auth')

Route
    .post('/user', Auth.verifyTokenMiddleware, TransactionController.rentBookByUser)
    .post('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.rentBook)
    .patch('/', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, TransactionController.returnBook)
    .get('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.getAllBorrowing)
    .get('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.getOneBorrowing)
    .delete('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.deleteBorrowing)
    .get('/user/:id', Auth.verifyTokenMiddleware, TransactionController.getHistoryBookByUserId)

module.exports = Route