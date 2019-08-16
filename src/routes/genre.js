const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/genre')

Route
    .get('/', GenreController.getGenre)
    .post('/', GenreController.addGenre)
    .patch('/:id', GenreController.updateGenre)
    .delete('/:id', GenreController.deleteGenre)

module.exports = Route