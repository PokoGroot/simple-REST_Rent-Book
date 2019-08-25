const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/book')

Route
    .get('/', BookController.getAll)
    .get('/:id', BookController.getOneBook)
    .post('/', BookController.addBook)
    .patch('/:id', BookController.updateBook)
    .delete('/:id', BookController.deleteBook)
    .get('/y/year', BookController.getYearBook)
    .get('/g/genre', BookController.getBookByGenre)
module.exports = Route