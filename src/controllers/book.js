const modelBook = require('../models/book')

module.exports = {
    getAll: (req, res) => {
        const keyword = req.query.search
        const sort = req.query.sortby
        const availability = req.query.availability
        const order = req.query.order || 'ASC '
        let pageLimit = parseInt(req.query.limit) || 5
        let activePage = req.query.page || 1
        let dataBegin = (pageLimit * activePage) - pageLimit

        modelBook.getData(keyword, sort, availability, order, dataBegin, pageLimit)
            .then(result => {
                //pagination result: current_page, next_page, total_pages, per_page, total_entries
                if (result.lenght != 0) return res.json(result)
                else return res.json({message: 'Book not found!'})
            })
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            })
    },
    addBook: (req, res) => {
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date_released,
            genre_id: req.body.genre_id,
            availability: req.body.availability
        }
        modelBook.addBook(data)
            .then(result => res.send({
                message: `${data.title} has been added to Book!`,
                status: 201,
                result: result
            }))
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            })
    },
    getOneBook: (req, res) => {
        const id = req.params.id

        modelBook.getOneBook(id)
            .then(result => {
                //standar result
                if (result.lenght != 0) return res.json(result)
                else return res.json({message: 'Book not found!'})
            })
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            })
    },
    updateBook: (req, res) => {
        const data = req.body
        const id = req.params.id

        modelBook.updateBook(data, id)
            .then(result => res.send({
                message: `Book with id=${id} has been updated`,
                status: 200,
                result: result
            }))
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            })
    },
    deleteBook: (req, res) => {
        let id = req.params.id

        modelBook.deleteBook(id)
            .then(result => res.send({
                message: `Book with id=${id} has been deleted`,
                status: 200,
                result: result
            }))
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            })
    }
}