const roteador = require('express').Router()
const TabelaFornecedor = require('./tabelaFilmes')
const Filme = require('../../models/filme')

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, resp)=>{
    const dadosRecebidos = req.body;
    const filme = new Filme(dadosRecebidos);

    await filme.criar();
    resp.send(JSON.stringify(filme));
})

roteador.get('/:id', async (req, res)=>{
    try{
        const idF = req.params.id;
        const filme = new Filme({id: idF});
    
        await filme.procurar();
        res.send(JSON.stringify(filme));
    }catch(erro){
        res.send(
            JSON.stringify(
            {mensagem : erro.message}
        ));
    }
})

module.exports = roteador;
