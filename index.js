const express = require('express')
const app = express()
const conn = require('./models/connection');
const bodyParser = require('body-parser')
const config = require('config')
const formatos = require('./models/serializador').formatosAceitos;

app.use(bodyParser.json())
app.use((req, res, proximo)=>{
    let formato = req.header('Accept');

    if(formato === "*/*"){
        formato = 'application/json';
    }

    if(formatos.indexOf(formato) === -1){
        res.status(406);
        res.end();
        return;
    }

    res.setHeader('Content-type', formato);
    proximo();
})

const roteador = require('./rotas/filmes');
const NaoEncontrado = require('./models/erros/NaoEncontrado');
app.use('/api/filmes', roteador);
app.use((erro, req, res, proximo)=>{
if(erro instanceof NaoEncontrado){
    res.status(404);
}else{
    res.status(400);
}
res.send(JSON.stringify({
    message: erro.message
}))

})

app.listen(config.get('api.porta'), ()=>{
    console.log('A api está funcionando')
})