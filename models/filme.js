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
        await this.validar();
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

    async procurar(){
        const encontrado = await tbFilme.buscar(this.id);

        this.nome = encontrado.nome;
        this.genero = encontrado.genero;
        this.resumo = encontrado.resumo;
        this.lancamento = encontrado.lancamento;
        this.dataAtualizacao = encontrado.dataCriacao;
        this.dataCriacao = encontrado.dataCriacao;
        this.versao = encontrado.versao;

    }

    async atualiza(){
        await tbFilme.buscar(this.id);
        const colunasAtt = ['nome', 'genero', 'resumo', 'lancamento'];
        const att = {};
        colunasAtt.forEach((campo)=>{
            const valor = this[campo];
            if(valor!==null && valor!== undefined && valor!==""){
                att[campo] = valor;
            }
        }
        )
        if(att.length<1){
            throw new Error('Nenhum dado fornecido.')
        }

        await tbFilme.atualizar(this.id, att);
    }

    async remover(){
        return await tbFilme.remover(this.id);
    }

    async validar(){
        const campos = ['nome', 'genero', 'resumo', 'lancamento'];
        campos.forEach((campo)=>{
            const valor = this[campo];
            if(valor== null || valor == undefined || valor==""){
                throw new Error("Por favor, insira todos os dados.")
            }
    })
}
}

module.exports = Filme;