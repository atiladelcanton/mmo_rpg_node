module.exports.index = function(application,req,res){
    res.render('index',{validacao:{},usuario_invalido:{}});
};

module.exports.autenticar = function(application,req,res){
    var dadosForm = req.body;

    req.assert('usuario','Usuário não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazio').notEmpty();
    var erros = req.validationErrors();
    if(erros){
        res.render('index',{validacao:erros,usuario_invalido:{}});
        return;
    }
    var dbConnection = new application.config.dbConnection();
    var UsuariosDAO = new application.app.models.UsuariosDAO(dbConnection);
    UsuariosDAO.autenticar(dadosForm,req,res);
    
};