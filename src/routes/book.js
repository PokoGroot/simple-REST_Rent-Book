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
    .get('/y/year/:year', BookController.getBookByYear)
    //get total book, popular book, get book by year
module.exports = Route