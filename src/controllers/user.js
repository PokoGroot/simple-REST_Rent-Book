const modelUser = require('../models/users')
const helper = require('../helpers/helpers')
const jwt = require('jsonwebtoken')

module.exports = {
    getData: (req, res) => {
        modelUser.getData()
        .then(result => res.json({ success: true, message: 'succes borrow', data: result, error: '' }))
        .catch(err => res.json({ success: false, message: 'fail borrow', data: '', error: err }))
    },
    register: (req, res) => {
        const secret = helper.generateSecret(18)
        const passwordHash = helper.setPassword(req.body.password, secret)
        const data = {
            email: req.body.email,
            password: passwordHash.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            secret_key: passwordHash.secret
        }
        modelUser.registerUser(data)
        .then(result => {
            delete data.secret_key
            if (result.affectedRows === 1) {
            delete data.password
            res.json({ success: true, message: 'succes register', data: data, error: '' })
            } else {
            res.json({ success: false, message: 'fail register', data: data, error: 'Data already existed' })
            }
        })
        .catch(err => res.json({ success: false, message: 'Data already existed', data: data, error: err }))
    },
    signin: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        modelUser.signinUser(email)
        .then(result => {
            const dataUser = result[0]
            const usePassword = helper.setPassword(password, dataUser.secret_key)
            if (usePassword.password === dataUser.Password) {
            delete dataUser.secret_key
            delete dataUser.Password
            const token = jwt.sign({ dataUser }, process.env.SECRET_KEY)
            res.json({ success: true, message: 'succes register', data: { token: `Bearer ${token}` }, error: '' })
            } else {
            res.json({ success: false, message: 'email or password false', data: [email, password], error: 'data not match' })
            }
        })
        .catch((err) => res.json({ success: false, message: 'email or password false', data: [email, password], error: err }))
    }
}