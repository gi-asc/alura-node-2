const Sequelize = require('sequelize')
const instancia = require('../../models/connection')

const colunas = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resumo: {
        type: Sequelize.TEXT
    },
    lancamento: {
        type: Sequelize.DATE
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'filmes',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('filmes', colunas, opcoes)
