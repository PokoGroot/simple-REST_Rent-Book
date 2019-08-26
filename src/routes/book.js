const express = require('express')
const Route = express.Router()

const Auth = require('../middleware/auth')
const BookController = require('../controllers/book')

Route
    .get('/', BookController.getAll)
    .get('/:id', BookController.getOneBook)
    .post('/', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, BookController.addBook)
    .patch('/:id', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, BookController.updateBook)
    .delete('/:id', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, BookController.deleteBook)
    .get('/y/year', BookController.getYearBook)
    .get('/g/genre/:name', BookController.getBookByGenre)
module.exports = Route