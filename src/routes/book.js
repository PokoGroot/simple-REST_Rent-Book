const express = require('express')
const Route = express.Router()

const Auth = require('../middleware/auth')
const BookController = require('../controllers/book')
const multer = require('../middleware/multer')

Route
    //user
    .post('/user', Auth.verifyTokenMiddleware, multer.multerUploads, BookController.donateBook)

    //admin
    .post('/', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, multer.multerUploads, BookController.addBook)
    .patch('/:id', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, BookController.updateBook)
    .delete('/:id', Auth.verifyTokenMiddleware, Auth.verifyAdminPrevilege, BookController.deleteBook)

    .get('/pending-book', BookController.pendingDonatedBook)
    .get('/', BookController.getAll)
    .get('/:id', BookController.getOneBook)
    .get('/y/year', BookController.getYearBook)
    .get('/g/genre/:name', BookController.getBookByGenre)
    .get('/y/year/:year', BookController.getBookByYear)
    //get total book, popular book
module.exports = Route