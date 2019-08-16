const rentModel = require('../models/rent')

module.exports = {
    rentBook: (req, res) => {
        const data = {
            user_id: req.user_id,
            book_id: req.body.book_id,
            rent_date: new Date()
        }

        const bookModel = require('../models/book')

        bookModel.getAvailability(data.book_id)
            .then(result => {
                console.log(data)
                if(result[0].availability == 1){
                    return Promise.all([
                        rentModel.insertTrans(data),
                        bookModel.setAvailability(data.book_id, 0)
                    ])
                }else{
                    res.json({message : "Book is not available to rent!"})
                }
            })
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
}