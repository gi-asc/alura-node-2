const roteador = require('express').Router()
const TabelaFilmes = require('./tabelaFilmes')
const Filme = require('../../models/filme')
const SerializadorFilme = require('../../models/serializador').SerializadorFilme;

roteador.get('/', async (requisicao, resposta, proximo) => {
    const resultados = await TabelaFilmes.listar()
    resposta.status(200);

    const serializadorFilme = new SerializadorFilme(resposta.getHeader('Content-type'))

    resposta.send(
        serializadorFilme.serializar(resultados)
    )
})

roteador.post('/', async (req, resp, proximo)=>{
try{
    const dadosRecebidos = req.body;
    const filme = new Filme(dadosRecebidos);
    const serializadorFilme = new SerializadorFilme(resp.getHeader('Content-type'))

    await filme.criar();
    resp.status(201);
    resp.send(serializadorFilme.serializar(filme));
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

        const serializadorFilme = new SerializadorFilme(res.getHeader('Content-Type'))

        res.send(serializadorFilme.serializar(filme));
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
