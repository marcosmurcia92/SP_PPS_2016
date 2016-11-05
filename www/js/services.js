angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('UsuarioDelorean',[function(){

}])

.service('SrvFirebase', [function(){

	this.RefUsuarios = RefUsuarios;
	this.RefDenuncias = RefDenuncias;

	var rutaFirebase = firebase.database().ref();

	function RefUsuarios(){
		return rutaFirebase.child('usuarios/');
	}

	function RefDenuncias(){
		return rutaFirebase.child('denuncias/');
	}
}])

.service('BlankService', [function(){

}]);