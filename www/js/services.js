angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('UsuarioDelorean',[function(){
	var nombre = "";
	var mail = "";
	var soyAdmin = false;
	
}])

.service('SrvFirebase', [function(){

	this.RefUsuarios = RefUsuarios;
	this.RefDenuncias = RefDenuncias;

	function ObtenerRef(coleccion){
		return firebase.database().ref(coleccion);
	}

	function RefUsuarios(){
		return ObtenerRef('usuarios/');
	}

	function RefDenuncias(){
		return ObtenerRef('denuncias/');
	}

	function RefDenuncias(){
		return ObtenerRef('contactos/');
	}
}])

.service('BlankService', [function(){

}]);