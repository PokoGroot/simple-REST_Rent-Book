const express = require('express')
const Route = express.Router()

const rentController = require('../controllers/rent')

Route
    .post('/', rentController.rentBook)

module.exports = Route