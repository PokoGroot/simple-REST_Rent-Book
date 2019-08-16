const returnModel = require('../models/return')

module.exports = {
    returnBook: (req, res) => {
        const data = {
            return_date: new Date()
        }
        const id = req.params.book_id

        const bookModel = require('../models/book')

        returnModel.bookReturn(data, id)
            .then(result => {
                return Promise.all([
                    bookModel.setAvailability(data.book_id, 1),
                    res.json(result)
                ])
            })
            .catch(err => console.log(err))
    }
}