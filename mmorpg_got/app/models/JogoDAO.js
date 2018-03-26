var ObjectID = require('mongodb').ObjectID;

function JogoDAO(dbConnection){
    this._connection = dbConnection;

}
/**
 * 
 * @param {*} usuario 
 */
JogoDAO.prototype.gerarParametros = function(usuario){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('jogo');
        collection.insert({
            usuario: usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000),
        });
        client.close();
    });
};
JogoDAO.prototype.IniciaJogo = function(usuario,res,casa,msg){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('jogo');
        collection.find({usuario:usuario}).toArray(function(err,result){
            res.render('jogo',{img_casa:casa,jogo:result[0],msg:msg});    
        });
        client.close();
    });
};

JogoDAO.prototype.acao = function(acao){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('acao');
        var date = new Date();
        var tempo = null;
        switch(parseInt(acao.acao)){
            case 1: tempo = 1 * 60 * 60000; break;
            case 2: tempo = 2 * 60 * 60000; break;
            case 3: tempo = 5 * 60 * 60000; break;
            case 4: tempo = 5 * 60 * 60000; break;
        }
        acao.acao_termina_em = date.getTime() + tempo;
        collection.insert(acao);
    });

     mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('jogo');
        var moedas = null;
        switch(parseInt(acao.acao)){
            case 1: moedas = -2 * acao.quantidade; break;
            case 2: moedas = -3 * acao.quantidade;break;
            case 3: moedas = -1 * acao.quantidade; break;
            case 4: moedas = -1 * acao.quantidade;break;
        }
        collection.update(
            { usuario:acao.usuario},
            { $inc:{moeda: moedas , suditos:parseInt(acao.quantidade)}});
        client.close();
    });
};
JogoDAO.prototype.getAcoes = function(usuario,res){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('acao');
        var date = new Date();
        var momento_atual = date.getTime();
        collection.find({usuario:usuario,acao_termina_em:{$gt:momento_atual}}).toArray(function(err,result){
            res.render('pergaminhos',{acoes:result});
        });
        client.close();
    });
};
JogoDAO.prototype.revogarAcao = function(_id,res){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('acao');
        collection.remove(
            {_id : ObjectID(_id)},
            function(err,result)
            {
                res.redirect('jogo?msg=D');
            }
        );
        client.close();
    });
}
module.exports = function(){
    return JogoDAO;
};