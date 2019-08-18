const modelGenre = require('../models/genre')

module.exports = {
    getGenre: (req, res) => {
        //standar response
        modelGenre.getGenre()
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    addGenre: (req, res) => {
        const data = req.body

        modelGenre.addGenre(data)
            .then(result => res.send({
                message: `Genre has been added`,
                status: 200,
                result: result
            }))
            .catch(err => console.log(err))
    },
    updateGenre: (req, res) => {
        const name = req.body
        let id = req.params.id

        modelGenre.updateGenre(name, id)
            .then(result => res.send({
                message: `Genre with id=${id} has been updated`,
                status: 200,
                result: result
            }))
            .catch(err => console.log(err))
    },
    deleteGenre: (req, res) => {
        const id = req.params.id

        modelGenre.deleteGenre(id)
            .then(result => res.send({
                message: `Genre with id=${id} has been deleted`,
                status: 200,
                result: result
            }))
            .catch(err => console.log(err))
    }
}