const returnModel = require('../models/return')

module.exports = {
    returnBook: (req, res) => {
        const data = {
            availability: 1
        }

        let id = req.params.id

        returnModel.returnBook(data, id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    }
}