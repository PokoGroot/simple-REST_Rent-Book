const transactionModel = require('../models/transaction')
const bookModel = require('../models/book')
const response = require('../helpers/responses')

//index => book availability: (0 = Borrowed, 1 = Available, 2 = Requested to rent by user, 3 = Requested to return by user)

module.exports = {
    //User Priviledge
    rentBookByUser: (req, res) => {
        const transData = {
            user_id: req.body.user_id,
            book_id: req.body.book_id,
            rent_date: new Date(),
            book_status: 'pending',
        }

        //if book is available then user can request to admin to rent book then set available to 2(pending)
        bookModel.getAvailability(transData.book_id)
            .then(result => {
                if (result[0].availability == '1') {
                    return Promise.all([
                        transactionModel.insertTrans(transData),
                        bookModel.setAvailability(transData.book_id, 2)
                    ])
                } else if (result[0].availability == '2') {
                    return response.getDataResponse(res, 401, `Sorry this book is already requested to rent!`)
                } else if (result[0].availability == '3') {
                    return response.getDataResponse(res, 401, `This book is requested to return! Come next time`)
                }
            })
            .then(result => {
                return response.dataResponseEdit(res, 201, `You request to borrow this book!`, transData)
            })
            .catch(err => {
                console.error(err)
                return response.dataResponseEdit(res, 500, 'Failed to request this book!', err)
            })
    },
    getHistoryBookByUserId: (req, res) => {
        let id = req.params.id

        transactionModel.getHistoryBookByUserId(id)
            .then(result => {
                if (result.length != 0) return response.getDataResponse(res, 200, result, result.length, page)
            })
            .catch(error =. {
                console.error(error)
                return response.getDataResponse(res, 500, error)
            })
    },
    //Admin Priviledge
    rentBook: (req, res) => {
        const transData = {
            user_id: req.body.user_id,
            book_id: req.body.book_id,
        }
        const userTrans = {
            book_status: 'rented'
        }
        //parameter decline/accept
        const adminInput = req.body.admin_input
        // admin can accept/decline request by user(set availability to 1 or 0),if admin accept then add detail transaction
        if(adminInput == '0') {
            bookModel.setAvailability(transData.book_id, 1)
                .then(result => {
                    return response.dataResponseEdit(res, 200, `You rejected request by ${transData.user_id}`)
                })
                .catch(err => {
                    console.error(err)
                    return response.dataResponseEdit(res, 500, 'Failed to request this book!', err)
                })
        } else if (adminInput == '1') {
            bookModel.getAvailability(transData.book_id)
                .then(result => {
                    if (result[0].availability == '2') {
                        return Promise.all([
                            transactionModel.getLatestRent(transData.book_id)
                            .then(result => transactionModel.returnBook(result[0].trans_id, userTrans)),
                            bookModel.setAvailability(transData.book_id, 0),
                        ])
                    } else {
                        return response.dataResponseEdit(res, 200, 'Book is not available yet!')
                    }
                })
                .then(result => {
                    return response.dataResponseEdit(res, 201, `${transData.user_id} borrowed this book!`, transData)
                })
                .catch(err => {
                    console.error(err)
                    return response.dataResponseEdit(res, 500, 'Failed to borrow this book!', err)
                })
        }
    },
    returnBook: (req, res) => {
        const data = {
            book_id: req.body.book_id,
            bill: req.body.bill || 0,
            return_date: new Date(),
            book_status: 'returned'
        }
        //parameter decline/accept by admin
        const adminInput = req.body.admin_input

        //if admin accepted the request then book is available again (set availability to 1 and add transaction detail), if not then status book change to 0
        if(adminInput == '0') {
            bookModel.setAvailability(data.book_id, 0)
                .then(result => {
                    return response.dataResponseEdit(res, 200, `You rejected request to return the book!`)
                })
                .catch(err => {
                    console.error(err)
                    return response.dataResponseEdit(res, 500, 'Failed to request this book!', err)
                })
        } else if (adminInput == '1'){
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
        }
    },
    //Using for admin to get all book request and history
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
    },
}