const express = require('express')
const Route = express.Router()

const returnController = require('../controllers/return')

Route
    .patch('/', returnController.returnBook)

module.exports = Route