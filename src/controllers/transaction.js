const transactionModel = require('../models/transaction')
const bookModel = require('../models/book')

module.exports = {
    returnBook: (req, res) => {
        const data = {
            book_id: req.body.book_id,
            return_date: new Date()
        }
        transactionModel.getLatestRent(data.book_id)
            .then(result => Promise.all([
                console.log(result[0].trans_id),
                transactionModel.returnBook(result[0].trans_id, data),
                bookModel.setAvailability(data.book_id, 1)
            ]))
            .catch(error => {
                console.log(error)
            })
            //standar response
            .then(result => res.json(result))
    },
    rentBook: (req, res) => {
        const transData = {
            user_id: req.body.user_id,
            book_id: req.body.book_id,
            rent_date: new Date()
        }

        bookModel.getAvailability(transData.book_id)
            .then(result => {
                if (result[0].availability == '1') {
                    return Promise.all([
                        transactionModel.insertTrans(transData),
                        bookModel.setAvailability(transData.book_id, 0)
                    ])
                } else {
                    res.json({ message: 'Book not available yet!' })
                }
            })
            .catch(error => {
                console.log(error)
            })
            //standar response
            .then(result => res.json(result))
        }
}