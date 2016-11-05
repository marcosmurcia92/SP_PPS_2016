angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('UsuarioDelorean',[function(){
	var nombre = "";
	var email = "";
	var soyAdmin = false;

	return {
		login:function(name,mail,admin){
			nombre = name;
			email = mail;
			soyAdmin = (admin == "SI");
		},getName:function(){
			return nombre;
		},getEmail:function(){
			return email;
		},isAdmin:function(){
			return soyAdmin;
		},getFullData:function(){
			var jsonUsuario = {};
			jsonUsuario.nombre = nombre;
			jsonUsuario.email = email;
			jsonUsuario.soyAdmin = soyAdmin;
			return JSON.stringify(jsonUsuario);
		}
	};
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