const conn = require('../configs/db')
// import { uploader, cloudinaryConfig } from './src/configs/cloudinaryConfig'
let table = `SELECT book_id, title, description, image, date_released, genre_name AS genre, availability 
            FROM book
            JOIN genre
            ON book.genre_id = genre.genre_id `

module.exports = {
    //get all book based on query
    getData: (keyword = null, sort = null, availability = null, order = null, genre_id = null, year = null, dataBegin, pageLimit) => {
        return new Promise((resolve, reject) => {
            const availabilityIsNotNull = availability != null
            const keywordIsNotNull = keyword != null
            const sortIsNotNull = sort != null
            const orderIsNotNull = order != null
            const genreIsNotNull = genre_id != null
            const yearIsNotNull = year != null
            let query = table

            if(availabilityIsNotNull || keywordIsNotNull || sortIsNotNull || genreIsNotNull || yearIsNotNull){
                query += availabilityIsNotNull || keywordIsNotNull || genreIsNotNull || yearIsNotNull ? `WHERE `:``
                query += yearIsNotNull ? `YEAR(date-released) = ${year} ` : ``
                query += yearIsNotNull && genreIsNotNull || yearIsNotNull && availabilityIsNotNull || yearIsNotNull && keywordIsNotNull || genreIsNotNull && availabilityIsNotNull || genreIsNotNull && keywordIsNotNull ? `AND `:``
                query += genreIsNotNull ? `book.genre_id = ${genre_id} ` : ``
                query += genreIsNotNull && availabilityIsNotNull || genreIsNotNull && keywordIsNotNull ? `AND `:``
                query += availabilityIsNotNull ? `availability = ${availability} `:``
                query += availabilityIsNotNull && keywordIsNotNull ? `AND `:``
                query += keywordIsNotNull ? `title LIKE '%${keyword}%' `:''
                query += sortIsNotNull ? `ORDER BY ${sort} `:''
                query += orderIsNotNull && sortIsNotNull ? order:''
            }                

            conn.query(`${query} LIMIT ?, ?`,
            [dataBegin, pageLimit],
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    //get all pending book
    pendingDonatedBook: () => {
        return new Promise((resolve, reject) => {
            conn.query(` SELECT * FROM book WHERE book.status = 'pending' `,
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    //add book to db
    addBook: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(' INSERT book SET ? ', 
            data, 
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    //get book detail
    getOneBook: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.*,genre.genre_name FROM book JOIN genre ON genre.genre_id = book.genre_id WHERE book_id = ?`,
            id,
            (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    //update book detail
    updateBook: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE book SET ? WHERE book_id = ?`,
            [data, id],
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    //delete book from db
    deleteBook: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM book WHERE book_id = ?',
            id ,
            (err, result) => {   
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    //get book availability
    getAvailability: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT availability FROM book WHERE book_id = ?',
            id,
            (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    //change book availability
    setAvailability: (id, availability) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE book SET availability = ? where book_id = ?',
            [availability, id],
            (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    //get book year release
    getYearBook: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT YEAR(date_released) AS year FROM book GROUP BY year',
            (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    //get book by genre
    BookByGenre: (genre_name) => {
        return new Promise((resolve, reject) => {
        conn.query(`${table} WHERE genre_name = ?`,
        genre_name,
        (err, result) => {
                if(err)
                    reject(err)
                else
                    resolve(result)
            })
        })
    },
    BookByYear: (year) => {
        return new Promise((resolve, reject) => {
        conn.query(`${table} WHERE YEAR(date_released) = ?`,
        year,
        (err, result) => {
                if(err)
                    reject(err)
                else
                    resolve(result)
            })
        })
    }
}