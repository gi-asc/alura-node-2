const express = require('express')
const app = express()
const conn = require('./models/connection');
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

const roteador = require('./rotas/filmes')
app.use('/api/filmes', roteador);

app.listen(config.get('api.porta'), ()=>{
    console.log('A api está funcionando')
})