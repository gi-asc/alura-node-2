const express = require('express')
const app = express()
const conn = require('./models/connection');
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

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