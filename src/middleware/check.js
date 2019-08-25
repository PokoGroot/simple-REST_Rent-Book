const Joi = require('@hapi/joi')
module.exports = {
    checkRegister: (req, res, next) => {
        // console.log(req.body)
        const schema = Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        first_name: Joi.string().alphanum().min(3).max(15).required(),
        last_name: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().min(8).required()
        })
        const data = req.body
        const result = Joi.validate(data, schema)
        if (result.error === null) {
        next()
        } else {
        res.json({ error: 'wrong input' })
        }
    }
}