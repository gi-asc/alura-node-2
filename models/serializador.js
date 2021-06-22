const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const jsontoxml = require('jsontoxml');

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    xml(dados){
        let tag = this.tagSingular;

        if(Array.isArray(dados)){
            tag = this.tagPlural
        }

        return jsontoxml({[tag] : dados})
    }

    serializar (dados) {
        dados = this.filtrar(dados);
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        if (this.contentType === 'application/xml') {
            return this.xml(dados);
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto(dados){
        const objPublico = {};
        const camposPublicos = ['id','nome','genero','resumo','lancamento'];
        camposPublicos.forEach((item)=>{
            objPublico[item] = dados[item];
        })
        return objPublico;
    }

    filtrar(dados){
        if(Array.isArray(dados)){
            dados = dados.map(this.filtrarObjeto)
        }
        else{
            dados = this.filtrarObjeto(dados);
        }

        return dados;
    }
}

class SerializadorFilme extends Serializador {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.tagSingular = 'filme';
        this.tagPlural = 'filmes';
    }
}

module.exports = {
    Serializador : Serializador,
    SerializadorFilme : SerializadorFilme,
    formatosAceitos : ['application/json', 'application/xml']
}