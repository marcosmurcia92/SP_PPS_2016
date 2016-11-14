angular.module('app.controllers')

.controller('denunciaUnEventoCtrl', function ($scope, $stateParams, $ionicPlatform, $timeout, $cordovaDatePicker, $cordovaGeolocation, firebase, SrvFirebase, UsuarioDelorean) {

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

	$scope.opciones = {};
	$scope.denuncia = {};
	//El usuario debería tomarse desde el rootscope donde tiene información del usuario logueado
	$scope.denuncia.usuario = UsuarioDelorean.getName() != '' ? UsuarioDelorean.getName() : UsuarioDelorean.getEmail();
	$scope.denuncia.ubicacionactual = {};
	$scope.denuncia.lugar = {};
	$scope.denuncia.fechaIngreso = $scope.denuncia.fechaSuceso = new Date();
	$scope.opciones.esfechaactual = true;

	//condicional para saber si es mobile (window.cordova == true) o no
	//es utilizado por el cordovaDatePicker
	$scope.opciones.esmobile = window.cordova ? true : false;
	console.info($scope.opciones.esmobile);

	try{
      $ionicPlatform.ready(function() {
      		//lógica para la geolocalización

      		var posOptions = {timeout: 10000, enableHighAccuracy: true};
      	  	$cordovaGeolocation
		    .getCurrentPosition(posOptions)
		    .then(function (position) {
		    	console.info(position);

		      	$scope.denuncia.ubicacionactual.lat = position.coords.latitude;
		      	$scope.denuncia.ubicacionactual.long = position.coords.longitude;

		      	var geocoder = new google.maps.Geocoder();
		      	var latlng = new google.maps.LatLng($scope.denuncia.ubicacionactual.lat, 
		      								$scope.denuncia.ubicacionactual.long);
		      	var request = {
		        	latLng: latlng
		      	};
		      	$timeout(function(){
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

				$scope.opciones.esubicacionactual = true;
		      	})
		    }, function(err) {
		    	console.error(err);
				$scope.opciones.esubicacionactual = false;
		    });
      });
  	}
  	catch(e){
  		console.error(e);
		$scope.opciones.esubicacionactual = false;
  	}

  	$scope.ElegirFecha = function(){
  		//funcionalidad que lanza el cordovadatetimepicker si la app corre en mobile
		if(!$scope.opciones.esfechaactual && $scope.opciones.esmobile){
		  	try{
		  		$ionicPlatform.ready(function() {
		  			var options = {
					    date: new Date(),
					    mode: 'datetime', // or 'time'
					    minDate: new Date() - 10000,
					    allowFutureDates: false,
					    doneButtonLabel: 'DONE',
					    doneButtonColor: '#F2F3F4',
					    cancelButtonLabel: 'CANCEL',
					    cancelButtonColor: '#000000'
					};

		  			$cordovaDatePicker.show(options).then(function(date){
				        alert(date);
				    });
		  		});
		  	}
		  	catch(e){
		  		console.error(e);
		  	}
	    }
  	}

  	$scope.TraerCoordenadas = function(){
  		//funcionalidad que utiliza la directiva googleplace para parsear la dirección a coordenadas
  		var request = {
        	address: $scope.denuncia.lugar.name
      	};
      	console.info(request);
      	var geocoder = new google.maps.Geocoder();
      	$timeout(function(){
      		geocoder.geocode(request, function(data, status) {
      			console.info(data);
      			console.info(status);
      			
	        	if (status == google.maps.GeocoderStatus.OK) {
	        		if (data[0] != null) {
	        			console.info(data);
	            		$scope.denuncia.lugar.lat = data[0].lat;
	            		$scope.denuncia.lugar.long = data[0].lng;
	          		} else {
	          			console.error("No hay informacion", data);
	          		}
	        	}
      		})
      	})
      	
  	}

  	$scope.Denunciar = function(){
  		$scope.denuncia.fechaIngreso = new Date();
  		if($scope.opciones.esubicacionactual){
  			$scope.denuncia.lugar = $scope.denuncia.ubicacionactual;
  		}
  		if($scope.opciones.esfechaactual){
  			$scope.denuncia.fechaSuceso = $scope.denuncia.fechaIngreso;
  		}
  		$scope.denuncia.estado = 'Pendiente';
		console.info($scope.denuncia);
		var referencia = firebase.database().ref('denuncias');
  		//var referencia = SrvFirebase.RefDenuncias();
  		var referenciaFirebase = referencia.push();
  		referenciaFirebase.set($scope.denuncia, function(respuesta){
  			console.info(respuesta);
  			alert('Se subió su denuncia');
  		});
  	}
})
