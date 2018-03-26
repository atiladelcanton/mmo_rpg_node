module.exports = function(application){
	application.get('/jogo', function(req, res){
		jogo(application).jogo(application,req,res);
	});

	application.get('/suditos', function(req, res){
		jogo(application).suditos(application,req,res);
	});
	
	application.get('/pergaminhos', function(req, res){
		jogo(application).pergaminhos(application,req,res);
	});
	application.post('/ordernar_acao_sudito', function(req, res){
		jogo(application).ordernar_acao_sudito(application,req,res);
	});
	application.get('/revogar_acao', function(req, res){
		jogo(application).revogar_acao(application,req,res);
	});
	application.get('/sair', function(req, res){
		jogo(application).sair(application,req,res);
	});
};

function jogo(application) {
	return application.app.controllers.jogo;
}
