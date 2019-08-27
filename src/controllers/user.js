require('dotenv').config()
const userModel = require('../models/user')
const responses = require('../helpers/responses')

const isFormValid = (data) => {
    const Joi = require('@hapi/joi')
    const schema = Joi.object().keys({
        fullname: Joi.string().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(8).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        level: Joi.string()
    })
    const result = Joi.validate(data, schema)
    if (result.error == null) return true
    else return false
}

const hash = (string) => {
    const crypto = require('crypto-js')
    return crypto.SHA256(string)
        .toString(crypto.enc.Hex)
}

module.exports = {
    registerUser: (req, res) => {
        const userData = {
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            level: 'regular'
        }

        if (!isFormValid(userData)) {
            return responses.dataResponseEdit(res, 200, 'Data is not valid')
        }

        userData.password = hash(userData.password)

        userModel.getAllUsersWithEmailOrUsername(userData.email, userData.username)
        .then(result => {
            if (result.length === 0) return userModel.registerUser(userData)
            else return responses.dataResponseEdit(res, 200, 'Username or email already registered')
        })
        .then(result => {
            return responses.dataResponseEdit(res, 200, 'Success registering new user', { id: result.insertId, username: userData.username })})
        .catch(err => {
            console.error(err)
            return responses.dataResponseEdit(res, 200, 'Failed registering user', err)
        })
    },
    registerAdmin: (req, res) => {
        const userData = {
            fullname: req.body.fullname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            level: 'admin'
        }

        if (!isFormValid(userData)) {
            return res.json({ message: 'user data not valid' })
        }

        userData.password = hash(userData.password)

        userModel.getAllUsersWithEmailOrUsername(userData.email, userData.username)
        .then(result => {
            if (result.length === 0) return userModel.registerUser(userData)
            else return responses.dataManipulationResponse(res, 200, 'Username or email already registered')
        })
        .then(result => responses.dataManipulationResponse(res, 201, 'Success registering new user', { id: result[0].insertId, username: userData.username }))
        .catch(err => {
            console.error(err)
            return responses.dataManipulationResponse(res, 200, 'Failed registering user', err)
        })
    },
    login: (req, res) => {
        const email = req.body.email
        const hashedPassword = hash(req.body.password)

        userModel.login(email, hashedPassword)
        .then(result => {
            if (result.length !== 0) {
            const jwt = require('jsonwebtoken')
            const payload = {
                id: result[0].id,
                username: result[0].username,
                fullname: result[0].fullname,
                email: result[0].email,
                level: result[0].level
            }
            jwt.sign(payload, process.env.JWT_SECRET,
                (err, token) => {
                if (err) {
                    console.error(err)
                }
                    res.setHeader('Set-Cookie', `Authorization=Bearer ${token}`)
                    res.json({ token: `Bearer ${token}` })
            })
            } else { return responses.dataResponseEdit(res, 200, 'Username or email is wrong') }
        })
        .catch(err => {
            console.error(err)
            return responses.dataResponseEdit(res, 500, err)
        })
    },
    getAllUsers: (req, res) => {
        const keyword = req.query.search
        const sort = req.query.sortby
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const start = (Number(page) - 1) * limit

        userModel.getAllUsers(keyword, sort, start, limit)
        .then(result => {
            if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, null)
            else return responses.getDataResponse(res, 200, null, null, null, 'No users found')
        })
        .catch(err => {
            console.error(err)
            return responses.getDataResponse(res, 500, err)
        })
    },
    getOneUser: (req, res) => {
        const id = req.params.id

        userModel.getOneUser(id)
        .then(result => {
            if (result.length !== 0) return responses.getDataResponse(res, 200, result, result.length, null)
            else return responses.getDataResponse(res, 200, null, null, null, 'No users found')
        })
        .catch(err => {
            console.error(err)
            return responses.getDataResponse(res, 500, err)
        })
    },
    getUserProfile: (req, res) => {
        const userProfile = {
        id: req.user_id,
        username: req.user_name,
        fullname: req.user_fullname,
        email: req.user_email,
        level: req.level
        }
        return responses.getDataResponse(res, 200, userProfile)
    }
}