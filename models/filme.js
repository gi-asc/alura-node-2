const tbFilme = require('../rotas/filmes/tabelaFilmes')

class Filme {
    constructor({id, nome, genero, resumo, lancamento, dataCriacao, dataAtualizacao, versao}){
        this.id = id;
        this.nome = nome;
        this.genero = genero;
        this.resumo = resumo;
        this.lancamento = lancamento;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar(){
        const result = await tbFilme.inserir({
            nome : this.nome,
            genero : this.genero,
            resumo : this.resumo,
            lancamento : this.lancamento
        })

        this.id = result.id;
        this.dataAtualizacao = result.dataCriacao;
        this.dataCriacao = result.dataCriacao;
        this.versao = result.versao;
    }
}

module.exports = Filme;