const modelBook = require('../models/book')
const responses = require('../helpers/responses')

module.exports = {
    getAll: (req, res) => {
        const keyword = req.query.search
        const sort = req.query.sortby
        const availability = req.query.availability
        const order = req.query.order || 'ASC '
        let pageLimit = parseInt(req.query.limit) || 12
        let activePage = req.query.page || 1
        let dataBegin = (pageLimit * activePage) - pageLimit

        modelBook.getData(keyword, sort, availability, order, dataBegin, pageLimit)
            .then(result => {
                if (result.lenght != 0) return responses.getDataResponse(res, 200, result, result.length, activePage)
                else return responses.getDataResponse(res, 200, null, null, null, 'Book not found!')
            })
            .catch(err => {
                console.error(err)
                return responses.getDataResponse(res, 500, err)
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
            .then(result => {
                // data.id = id
                return responses.dataResponseEdit(res, 201, 'Success inserting data', data)
            })
            .catch(err => {
                console.error(err)
                return responses.dataResponseEdit(res, 500, 'Failed to insert data', err)
            })
    },
    getOneBook: (req, res) => {
        const id = req.params.id

        modelBook.getOneBook(id)
            .then(result => {
                //standar result
                if (result.lenght != 0) return responses.getDataResponse(res, 200, result, result.length)
                else return responses.getDataResponse(res, 200, null, null, null, 'Book not found!')
            })
            .catch(err => {
                console.error(err)
                return responses.getDataResponse(res, 500, err)
            })
    },
    updateBook: (req, res) => {
        const data = req.body
        const id = req.params.id

        modelBook.updateBook(data, id)
            .then(result => {
                data.id = id
                if (result.affectedRows !== 0) return responses.dataResponseEdit(res, 200, 'Success updating data', data)
                else return responses.dataResponseEdit(res, 200, 'Failed to update', data)
            })
            .catch(err => {
                console.log(err)
                return res.sendStatus(500)
            })
    },
    deleteBook: (req, res) => {
        let id = req.params.id

        modelBook.deleteBook(id)
            .then(result => {
                result.id = id
                if (result.affectedRows !== 0) return responses.dataResponseEdit(res, 200, 'Success deleting data', result)
                else return responses.dataResponseEdit(res, 200, 'Failed to delete', result)
            })
            .catch(err => {
                console.error(err)
                return responses.getDataResponse(res, 500, err)
            })
    },
    getYearBook: (req, res) => {
        modelBook.getYearBook()
            .then(result => {
                if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
                else return responses.getDataResponse(res, 200, null, null, null, 'Books not found')
            })
            .catch(err => {
                console.error(err)
                return responses.getDataResponse(res, 500, err)
            })
    },
    //bug (can't show data)
    getBookByGenre: (req, res) => {
        const genre = req.params.genre_id
        modelBook.getBookByGenre(genre)
            .then(result => {
                if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length)
                else return responses.getDataResponse(res, 200, null, null, null, 'Books not found')
            })
            .catch(err => {
                console.error(err)
                return responses.getDataResponse(res, 500, err)
            })
    }

}