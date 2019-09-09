const express = require('express')
const Route = express.Router()

const TransactionController = require('../controllers/transaction')
const Auth = require('../middleware/auth')

Route
    .get('/user/:id', Auth.verifyTokenMiddleware, TransactionController.getHistoryBookByUserId)
    .post('/user', Auth.verifyTokenMiddleware, TransactionController.rentBookByUser)
    //admin
    .post('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.rentBook)
    .patch('/', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, TransactionController.returnBook)
    .delete('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.deleteBorrowing)
    .get('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, TransactionController.getAllBorrowing)
    .get('/request', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, TransactionController.getRentRequestsByUser)
    .get('/history/:id', Auth.verifyTokenMiddleware, TransactionController.getHistoryBookByUserId)

module.exports = Route