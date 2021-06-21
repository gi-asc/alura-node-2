class DadosInvalidos extends Error {
    constructor () {
        super('Dados Inválidos')
        this.name = 'DadosInvalidos'
        this.idErro = 1
    }
}

module.exports = DadosInvalidos