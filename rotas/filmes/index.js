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
try{
    const dadosRecebidos = req.body;
    const filme = new Filme(dadosRecebidos);

    await filme.criar();
    resp.send(JSON.stringify(filme));
}catch(erro){
    resp.send(
        JSON.stringify(
        {mensagem : erro.message}
    ));
}
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

roteador.put('/:id', async(req, res)=>{
try{
    const id = req.params.id;
    const dados = req.body;

    const completo = Object.assign({}, dados, {id : id});
    const filme = new Filme(completo);
    await filme.atualiza();
    res.end();
}catch(erro){
    res.send(JSON.stringify({
        mensagem : erro.message
    }))
}
})

roteador.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const filme = new Filme({id : id});
        await filme.procurar();
        filme.remover();
        res.end();
    }catch(erro){
        res.send(JSON.stringify({
            mensagem : erro.message
        }))
    }
})

module.exports = roteador;
