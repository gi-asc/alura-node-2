const Modelo = require('./modeloFilmes')

module.exports = {
    listar () {
        return Modelo.findAll()
    },

    inserir(filme) {
        return Modelo.create(filme);
    }
}