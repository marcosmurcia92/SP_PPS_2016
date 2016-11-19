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

.service('SrvFirebase', ['$http',function($http){

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
		var http = new XMLHttpRequest();
    	var url =  'https://fcm.googleapis.com/fcm/send';
		
		var params = JSON.stringify({
				    "to":"/topics/all", //Topic or single device
				"notification":{
				    "title":"Autopistas Delorean",  //Any value
				    "body":"Una nueva Denuncia fue ingresada.",  //Any value
				    "sound":"default", //If you want notification sound
				    "click_action":"FCM_PLUGIN_ACTIVITY",  //Must be present for Android
				    "icon":"fcm_push_icon"  //White icon Android resource
				  },
				    "priority":"high" //If not set, notification won't be delivered on completely closed iOS app
			});

		http.open("POST", url, true);
	    http.setRequestHeader("Content-type", "application/json");
	    http.setRequestHeader('Authorization', 'key=AIzaSyDrcIOmidimEhCPJIGqlSJJQQ-9i0_yLKc');

	    http.onreadystatechange = function() {
	        if(http.readyState == 4 && http.status == 200) {
	            console.log(http.responseText);
	        }
	    }
	    http.send(params);
		}
}])

.service('BlankService', [function(){

}]);