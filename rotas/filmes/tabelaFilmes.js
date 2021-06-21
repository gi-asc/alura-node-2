const Modelo = require('./modeloFilmes')

module.exports = {
    listar () {
        return Modelo.findAll()
    },

    inserir(filme) {
        return Modelo.create(filme);
    },

    async buscar(id){
        const encontrado = await Modelo.findOne({
            where : {
                id : id
            }
        })
        if(!encontrado){
            throw new Error('Filme não encontrado');
        }

        return encontrado;
    }
}