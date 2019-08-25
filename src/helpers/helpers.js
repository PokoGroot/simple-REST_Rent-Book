const crypto = require('crypto')

module.exports = {
    generateSecret: (length) => {
        return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
    },
    setPassword: (password, secret) => {
        const hash = crypto.createHmac('sha512', secret)
        hash.update(password)
        const value = hash.digest('hex')
        return {
        secret: secret,
        password: value
        }
    }
}