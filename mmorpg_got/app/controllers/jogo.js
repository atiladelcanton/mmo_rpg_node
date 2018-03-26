module.exports.jogo = function(application,req,res){
    
    if(req.session.autorizado !== true)
    {
        res.render('index',{validacao:{}});
        return;
    }

    var msg = '';
    if(req.query.msg != '')
    {
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var dbConnection = new application.config.dbConnection();
    var jogo  = new application.app.models.JogoDAO(dbConnection);
    jogo.IniciaJogo(usuario,res,casa,msg);
    
};

module.exports.sair = function(application,req,res){
    req.session.destroy(function(err){
        res.render('index',{validacao:{}});
    });
};

module.exports.suditos = function(application,req,res){
    if(req.session.autorizado !== true)
    {
        res.render('index',{validacao:{}});
        return;
    }
    res.render('aldeoes');
};

module.exports.pergaminhos = function(application,req,res){
    if(req.session.autorizado !== true)
    {
        res.render('index',{validacao:{}});
        return;
    }

    var dbConnection = new application.config.dbConnection();
    var jogo  = new application.app.models.JogoDAO(dbConnection);
    var usuario = req.session.usuario;
    jogo.getAcoes(usuario,res);
    
};
module.exports.ordernar_acao_sudito = function(application,req,res){
    if(req.session.autorizado !== true)
    {
        res.render('index',{validacao:{}});
        return;
    }
    var dadosForm = req.body;

    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
    var dbConnection = new application.config.dbConnection();
    var jogo  = new application.app.models.JogoDAO(dbConnection);
    dadosForm.usuario = req.session.usuario;
    jogo.acao(dadosForm);
    res.redirect('jogo?msg=B');
};

module.exports.revogar_acao = function(application,req,res){
    var url_query = req.query;
    var dbConnection = new application.config.dbConnection();
    var jogo  = new application.app.models.JogoDAO(dbConnection);
    var _id = url_query.id_acao;
    jogo.revogarAcao(_id,res);
}