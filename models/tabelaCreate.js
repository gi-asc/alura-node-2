 
const ModeloTabela = require('../rotas/filmes/modeloFilmes')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)