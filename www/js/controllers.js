angular.module('app.controllers', ['firebase', 'ngCordova'])

.controller('denunciaUnEventoCtrl', function ($scope, $stateParams, $ionicPlatform, $cordovaGeolocation) {
	$scope.tipos = [
		{
			name: 'Accidente',
			value: 1
		},
		{
			name: 'Avería de su vehículo',
			value: 2
		},
		{
			name: 'Animal suelto',
			value: 3
		},
		{
			name: 'Necesidad de ambulancia',
			value: 4
		}
	];

	$scope.denuncia = {};
	$scope.denuncia.ubicacionactual = {};

	try{
      $ionicPlatform.ready(function() {
      		var posOptions = {timeout: 10000, enableHighAccuracy: true};
      	  	$cordovaGeolocation
		    .getCurrentPosition(posOptions)
		    .then(function (position) {
		    	console.info(position);
				$scope.denuncia.esubicacionactual = true;

				$scope.denuncia.ubicacionactual.nombre = 'Ruta 8 km 32, Argentina';
		      	$scope.denuncia.ubicacionactual.lat = position.coords.latitude;
		      	$scope.denuncia.ubicacionactual.long = position.coords.longitude;

		      	var geocoder = new google.maps.Geocoder();
		      	var latlng = new google.maps.LatLng($scope.denuncia.ubicacionactual.lat, 
		      								$scope.denuncia.ubicacionactual.long);
		      	var request = {
		        	latLng: latlng
		      	};
		      	geocoder.geocode(request, function(data, status) {
		        	if (status == google.maps.GeocoderStatus.OK) {
		        		if (data[0] != null) {
		            		$scope.denuncia.ubicacionactual.nombre = data[0].formatted_address;
		          		} else {
		          			console.error("No hay informacion", data);
		            		$scope.denuncia.ubicacionactual.nombre = "";
		          		}
		        	}
		      	})

		    }, function(err) {
		    	console.error(err);
				$scope.denuncia.esubicacionactual = false;
		    });
      });
  	}
  	catch(e){
  		console.error(e);
		$scope.denuncia.esubicacionactual = false;
  	}
})

.controller('mapaDeDenunciasCtrl', function ($scope, $stateParams,NgMap,$ionicPopup) {
	var  usuario="Robertiño";
	var  fecha="10/10/2016";
	var descripcion="Choque  de frente entre dos autos con multiples herido, ambulacia  en camino";
	//var firabaseMapa=new Firebase('https://autopistasdelorian-ea30b.firebaseio.com/PruebaMapa');
	//firabaseMapa.push({"mensaje":"hola"});

	$scope.map = {};
	$scope.map.name = "Alarmas";
	$scope.map.latitud = -34.6671999;
	$scope.map.longitud = -58.35926;
	$scope.mensaje="holaa";
	$scope.marcas = [];
	for (var i = 0; i < 10; i++) {
		var imagen;
		switch(i){
			case 1:
			imagen="marcaAccidente"
			var  usuario="Robertiño";
			var  fecha="10/10/2016";
			var descripcion="Choque  de frente entre dos autos con multiples herido, ambulacia  en camino";

			break;
			case 2:
			imagen="marcaAccidente"
			var  usuario="Jose";
			var  fecha="03/05/2016";
			var descripcion="Choque   de moto  contra  un camion  3 muertos "; 
			break;
			case 3:
			imagen="marcaAmbulancia"	
			var  usuario="Josafina";
			var  fecha="04/05/2016";
			var descripcion="Herido de Gravedad "; 
			break;
			case 4:
			imagen="marcaAmbulancia"	
			var  usuario="Marta";
			var  fecha="04/06/2016";
			var descripcion="Fractura  multiple "; 
			break;
			case 5:
			imagen="marcaAmbulancia"
			var  usuario="Mario";
			var  fecha="04/05/2016";
			var descripcion="Animal  herido   "; 
			break;
			case 6:
			imagen="marcaAnimal"
			var  usuario="Mario";
			var  fecha="04/05/2016";
			var descripcion="Elefante por el medio de la avenida, destruye todo lo  que se le pone en el camino   "; 
			break;
			case 7:
			imagen="marcaAnimal"
			var  usuario="Maria";
			var  fecha="01/05/2016";
			var descripcion="Jirafa en el tunel no puede salir  "; 
			break;
			case 8:
			imagen="marcaAveria"
			var  usuario="Juan";
			var  fecha="14/08/2016";
			var descripcion="Auto  sin rueda posiblemente  los roba rueda  en accion   "; 
			break;
			case 9:
			imagen="marcaAveria"
			var  usuario="Julian";
			var  fecha="24/11/2016";
			var descripcion="Camion  desbarranco  el acoplado por la 9 de julio"; 
			break;
			case 0:
			imagen="marcaAveria"
			var  usuario="Agustin";
			var  fecha="24/11/2016";
			var descripcion="Camion  problemas en el motor "; 
			break;
		}

		var longi=Math.random();
		var lati= Math.random();
		console.log((-30.1347676-lati)+"-"+(-45.6016699-longi))
		///console.log(Math.random());
		//console.log(Math.floor((Math.random()*100) + 1));
		$scope.marcas.push({
			lati:(- 35.6016699+lati), 
			longi:( -59.1347676+longi),
			imagen:imagen,
			fecha:fecha,
			usuario:usuario,
			descripcion:descripcion

		})
	};

	$scope.MostrarInformacion=function( dato){
		$scope.informacion=dato;
		$ionicPopup.alert({
			templateUrl: 'templates/popupInformacion.html',
			title: 'Informacion',
			subTitle: 'Datos de lo que ah pasado',
			scope: $scope
		});



	}

})

.controller('contactanosCtrl', function ($scope, $stateParams) {
	//Traer por rootscope que se cargue cuando el usuario se loguea
	//o cuando entra a la aplicación (estando ya logueado).
	//El rootscope se debería cargar con los datos del usuario
	//guardados en firebase.
	$scope.denunciasrealizadas = [
		{
			id: 158486,
			name: 'Accidente Puente Pueyrredon 15-06-16'
		},
		{
			id: 167481,
			name: 'Animal suelto Ruta 4 km 9 14-02-15'
		}
	]

	$scope.motivos = [
		{
			name: 'Valorar la atención',
			value: 1
		},
		{
			name: 'Consulta',
			value: 2
		},
		{
			name: 'Sugerencia',
			value: 3
		},
		{
			name: 'Queja',
			value: 4
		}
	];

	$scope.contacto = {};

	console.log($scope.contacto);

})

.controller('menuCtrl', function ($scope, $stateParams) {


})

.controller('ingresoCtrl',  function ($scope, $stateParams) {


})
