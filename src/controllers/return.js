const returnModel = require('../models/return')
const bookModel = require('../models/book')

module.exports = {
    returnBook: (req, res) => {
        const data = {
            book_id: req.body.book_id,
            return_date: new Date()
        }
        returnModel.getLatestRent(data.book_id)
            .then(result => Promise.all([
                console.log(result[0].trans_id),
                returnModel.returnBook(result[0].trans_id, data),
                bookModel.setAvailability(data.book_id, 1)
            ]))
            .catch(error => {
                console.log(error)
            })
            //standar response
            .then(result => res.json(result))
    }
}