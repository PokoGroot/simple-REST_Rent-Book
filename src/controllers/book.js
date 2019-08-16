const modelBook = require('../models/book')

module.exports = {
    getAll: (req, res) => {
        const keyword = req.query.search
        const sort = req.query.sortby
        const availability = req.query.availability
        let pageLimit = parseInt(req.query.limit) || 3
        let activePage = req.query.page || 1
        let dataBegin = (pageLimit * activePage) - pageLimit

        modelBook.getData(keyword, sort, availability, dataBegin, pageLimit)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    addBook: (req, res) => {
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date_released,
            genre_id: req.body.genre_id,
            availability: req.body.availability,
            
        }
        modelBook.addBook(data)
            .then(result => res.send({
                message: 'Book has been updated!',
                result: result
            }))
            .catch(err => console.log(err))
    },
    getOneBook: (req, res) => {
        const id = req.params.id

        modelBook.getOneBook(id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    updateBook: (req, res) => {
        const data = req.body
        const id = req.params.id

        modelBook.updateBook(data, id)
            .then(result => res.send({
                message: 'Book has been updated',
                result: result
            }))
            .catch(err => console.log(err))
    },
    deleteBook: (req, res) => {
        let id = req.params.id

        modelBook.deleteBook(id)
            .then(result => res.send({
                message: 'Book has been deleted',
                result: result
            }))
            .catch(err => console.log(err))
    }
}