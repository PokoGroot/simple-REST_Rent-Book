const rentModel = require('../models/rent')
const bookModel = require('../models/book')

module.exports = {
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
                        rentModel.insertTrans(transData),
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