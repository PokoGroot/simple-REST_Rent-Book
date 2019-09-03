const transactionModel = require('../models/transaction')
const bookModel = require('../models/book')
const response = require('../helpers/responses')

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
                        transactionModel.insertTrans(transData),
                        bookModel.setAvailability(transData.book_id, 0)
                    ])
                } else {
                    return response.dataResponseEdit(res, 200, 'Book is not available yet!')
                }
            })
            .then(result => {
                return response.dataResponseEdit(res, 201, 'You borrowed this book!', transData)
            })
            .catch(err => {
                console.error(err)
                return response.dataResponseEdit(res, 500, 'Failed to borrow this book!', err)
            })
    },
    returnBook: (req, res) => {
        const data = {
            book_id: req.body.book_id,
            bill: req.body.bill || 0,
            return_date: new Date()
        }
        transactionModel.getLatestRent(data.book_id)
            .then(result => {
                if( result.length !== 0 ) {
                    return Promise.all([
                        transactionModel.returnBook(result[0].trans_id, data),
                        bookModel.setAvailability(data.book_id, 1)
                    ])
                } else {
                    return response.dataResponseEdit(res, 200, 'Book has been already returned!')
                }
            })
            .then(result => response.dataResponseEdit(res, 200, 'Succes returning book!', data))
            .catch(error => {
                console.error(error)
                return response.dataResponseEdit(res, 500, 'Failed to return book!', error)
            })
    },
    getAllBorrowing: (req, res) => {
        let keyword = req.query.search
        let sort = req.query.sortby
        let bookStatus = req.query.book_status
        let page = req.query.page || 1
        let pageLimit = req.query.limit || 10
        let dataBegin = (Number(page) - 1) * pageLimit

        transactionModel.getAllBorrowing(keyword, sort, bookStatus, dataBegin, pageLimit)
            .then(result => {
                if (result.length != 0) return response.getDataResponse(res, 200, result, result.length, page)
            })
            .catch(error => {
                console.error(error)
                return response.getDataResponse(res, 500, error)
            })
    },
    getOneBorrowing: (req, res) => {
        const id = req.params.id

        transactionModel.getOneBorrowing(id)
            .then(result => {
                if (result.length !== 0) return response.getDataResponse(res, 200, result, result.length)
                else return response.getDataResponse(res, 200, null, null, null, 'Borrowing data not found!')
            })
            .catch(error => {
                console.error(error)
                return response.getDataResponse(res, 500, error)
            })
    },
    deleteBorrowing: (req, res) => {
        const id = req.params.id

        transactionModel.deleteBorrowing(id)
            .then(result => response.dataResponseEdit(res, 200, 'Success deleting borrowing data', result))
            .catch(err => {
                console.error(err)
                return response.dataResponseEdit(res, 200, 'Failed to delete borrowing data', err)
            })
    }
}