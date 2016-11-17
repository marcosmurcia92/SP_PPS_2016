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
			soyAdmin = admin;
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

.service('SrvFirebase', [function($http){

	this.RefUsuarios = RefUsuarios;
	this.RefDenuncias = RefDenuncias;
	this.RefReclamos=RefReclamos;
	this.EnviarNotificacion = EnviarNotificacion;

	function ObtenerRef(coleccion){
		return firebase.database().ref(coleccion);

	}

	function RefUsuarios(){
		return ObtenerRef('usuarios/');
	}

	function RefDenuncias(){
		return ObtenerRef('denuncias/');
	}

	function RefContactos(){
		return ObtenerRef('contactos/');
	}
	function RefReclamos(){
		return ObtenerRef('reclamos/');
	}

	function EnviarNotificacion(){
		var req = {
			method: 'POST',
			url: 'https://fcm.googleapis.com/fcm/send',
			headers:{
				'Content-Type': 'application/json',
				'Authorization': 'key=AIzaSyDrcIOmidimEhCPJIGqlSJJQQ-9i0_yLKc'
			},
			body: {
				"notification":{
				    "title":"Autopistas Delorean",  //Any value
				    "body":"Una nueva Denuncia fue ingresada.",  //Any value
				    "sound":"default", //If you want notification sound
				    "click_action":"FCM_PLUGIN_ACTIVITY",  //Must be present for Android
				    "icon":"fcm_push_icon"  //White icon Android resource
				  },
				  "data":{
				    "param1":"value1",  //Any data to be retrieved in the notification callback
				    "param2":"value2"
				  },
				    "to":"/topics/autopistasDelorean", //Topic or single device
				    "priority":"high", //If not set, notification won't be delivered on completely closed iOS app
				    "restricted_package_name":"" //Optional. Set for application filtering
			}
		};

		$http(req).then(function(rta){
			console.info("NOTIFICACION ENVIADA: ",rta);
		}, function(error){
			console.info("ERROR DE NOTIFICACION: ", error);
		});
	}
}])

.service('BlankService', [function(){

}]);