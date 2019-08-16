const express = require('express')
const Route = express.Router()

const rentController = require('../controllers/rent')

Route
    .get('/:book_id', rentController.rentBook)

module.exports = Route