const config = require('config');
const Sequelize = require('sequelize');

const conn = new Sequelize(
    config.get('mysql.db'),
    config.get('mysql.user'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
);

conn.authenticate().then(console.log('Conectado com sucesso!')).catch((erro)=>{
    console.log("Ocorreu um erro ao conectar: " + erro);
});

module.exports = conn;