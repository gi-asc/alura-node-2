const roteador = require('express').Router()
const TabelaFornecedor = require('./tabelaFilmes')
const Filme = require('../../models/filme')

roteador.get('/', async (requisicao, resposta, proximo) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200);
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, resp, proximo)=>{
try{
    const dadosRecebidos = req.body;
    const filme = new Filme(dadosRecebidos);

    await filme.criar();
    resp.status(201);
    resp.send(JSON.stringify(filme));
}catch(erro){
    proximo(erro);
    }
})

roteador.get('/:id', async (req, res, proximo)=>{
    try{
        const idF = req.params.id;
        const filme = new Filme({id: idF});
    
        await filme.procurar();
        res.status(200);
        res.send(JSON.stringify(filme));
    }catch(erro){
        proximo(erro);
        }
})

roteador.put('/:id', async(req, res, proximo)=>{
try{
    const id = req.params.id;
    const dados = req.body;

    const completo = Object.assign({}, dados, {id : id});
    const filme = new Filme(completo);
    await filme.atualiza();
    res.status(204);
    res.end();
}catch(erro){
proximo(erro);
}
})

roteador.delete('/:id', async (req, res, proximo)=>{
    try{
        const id = req.params.id;
        const filme = new Filme({id : id});
        await filme.procurar();
        filme.remover();
        res.status(204);
        res.end();
    }catch(erro){
        proximo(erro);
        }
})

module.exports = roteador;
