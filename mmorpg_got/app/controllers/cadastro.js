module.exports.cadastro = function(application,req,res){
    res.render('cadastro',{validacao:{},dadosForm:{}});
};

module.exports.cadastrar = function(application,req,res){
    var dadosForm = req.body;

    req.assert('nome','Nome não pode ser vazio').notEmpty();
    req.assert('usuario','Usuário não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazia').notEmpty();
    req.assert('casa','Selecione uma casa').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.render('cadastro',{validacao:erros,dadosForm:dadosForm});
        return;
    }
    var dbConnection = new application.config.dbConnection();
 

    var usuario = new application.app.models.UsuariosDAO(dbConnection);
    usuario.inserirUsuario(dadosForm);
    var jogo  = new application.app.models.JogoDAO(dbConnection);
    jogo.gerarParametros(dadosForm.usuario);
    res.send('So foi');
};