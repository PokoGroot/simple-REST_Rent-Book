const modelGenre = require('../models/genre')

module.exports = {
    getGenre: (req, res) => {
        modelGenre.getGenre()
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    addGenre: (req, res) => {
        const data = req.body

        modelGenre.addGenre(data)
            .then(result => res.send(result))
            .catch(err => console.log(err))
    },
    updateGenre: (req, res) => {
        const name = req.body
        let id = req.params.id

        modelGenre.updateGenre(name, id)
            .then(result => res.send({
                message: 'Genre has been updated',
                result: result
            }))
            .catch(err => console.log(err))
    },
    deleteGenre: (req, res) => {
        const id = req.params.id

        modelGenre.deleteGenre(id)
            .then(result => res.send({
                message: 'Genre has been deleted',
                result: result
            }))
            .catch(err => console.log(err))
    }
}