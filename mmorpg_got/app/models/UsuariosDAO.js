function UsuariosDAO(dbConnection){
    this._connection = dbConnection;

}
UsuariosDAO.prototype.inserirUsuario = function(usuario){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
            var collection = db.collection('usuarios');
            collection.insert(usuario);
            client.close();
        });
};

UsuariosDAO.prototype.autenticar = function(usuario,req,res){
    var mongoConnected = this._connection.connectToMongo(function(client, db){
        var collection = db.collection('usuarios');
        collection.find(usuario).toArray(function(err,result){
            if(result[0] != undefined){
                req.session.autorizado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
                var hour = 3600000;
                req.session.cookie.expires = new Date(Date.now() + hour);
                
                
            }

            if(result[0] == undefined){
                res.render('index',{validacao:{},usuario_invalido:true});
                return;
            }

            if(req.session.autorizado){

                res.redirect('jogo');
            }else{
                res.render('index',{validacao:{},usuario_invalido:{}});
            }
            
        });
        client.close();
    });
};

module.exports = function(){
    return UsuariosDAO;
};