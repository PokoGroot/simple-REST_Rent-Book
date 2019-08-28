const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/genre')
const Auth = require('../middleware/auth')

Route
    //get one genre
    .get('/', GenreController.getGenre)
    .post('/', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, GenreController.addGenre)
    .patch('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, GenreController.updateGenre)
    .delete('/:id', Auth.verifyTokenMiddleware,Auth.verifyAdminPrevilege, GenreController.deleteGenre)

module.exports = Route