angular.module('app.controllers', ['firebase', 'ngCordova'])

.controller('denunciaUnEventoCtrl', function ($scope, $stateParams, $ionicPlatform, $timeout,  $cordovaGeolocation, firebase) {
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
	//El usuario debería tomarse desde el rootscope donde tiene información del usuario logueado
	$scope.denuncia.usuario = "Pepito el verdulero";
	$scope.denuncia.ubicacionactual = {};
	$scope.denuncia.lugar = {};

	try{
      $ionicPlatform.ready(function() {
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

				$scope.denuncia.esubicacionactual = true;
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

  	$scope.TraerCoordenadas = function(){
  		var request = {
        	'address': $scope.denuncia.lugar.name
      	};

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
		console.info($scope.denuncia);
		var referencia = firebase.database().ref('denuncias');
  		var referenciaFirebase = referencia.push();
  		referenciaFirebase.set($scope.denuncia);
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
			subTitle: 'Datos de lo que ha pasado',
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

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $ionicGoogleAuth, $ionicUser, $ionicAuth, $ionicPlatform) {


 })

 .controller('ingresoCtrl',  function($scope, $ionicModal, $timeout, $ionicGoogleAuth, $ionicUser, $ionicAuth, $ionicPlatform){

  $scope.loginData = {};
  $scope.VerLogin = true; //Variable booleana para cambiar de vista
  $scope.registerData = {};
  $scope.loginData.username = "";
  $scope.usuarioGoogle = {};
  $scope.usuarioGithub = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.GoRegistrar = function() {
    $scope.VerLogin = false;
  };

  $scope.GoLogin = function() {
    $scope.VerLogin = true;
  };

  $scope.Registrarse = function(){

    $scope.habilitadoRegister = false;

    firebase.auth().createUserWithEmailAndPassword($scope.registerData.username, $scope.registerData.password).catch(function (error){
      console.info("error", error);

      if (error.code == "auth/invalid-email") {
        alert("El mail ingresado es invalido");
      };

      if (error.code == "auth/user-not-found") {
        alert("No hay email que se corresponda con el ingresado. Puede que el usuario haya borrado esa cuenta.")
      };

      if (error.code == "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caracteres");
      };
    }).then(function (respuesta){

      $timeout(function (){

        $scope.VerLogin = true;
        $scope.habilitadoRegister = true;
        console.info("respuesta", respuesta);

        if (firebase.auth().currentUser != null) {

          firebase.auth().currentUser.sendEmailVerification() //Apenas se registra, envio mail para verificar casilla.
            .then(function (response){
              $scope.habilitadoRegister = true;
              alert("Se envio mail de verificacion a tu casilla. Ingresa en el link que alli se indica para completar el registro");

            }) 

        };

      })
      
    })
  };

  $scope.OlvidePassword = function(){
    console.log("olvideeee");

    if($scope.loginData.username != ""){
        firebase.auth().sendPasswordResetEmail($scope.loginData.username).then(function (respuesta){
        console.info("respuestaOlvide", respuesta);

        alert("Se envio mail de reestablecimiento de Password a su casilla");

      }).catch(function (error){
        console.info("errorOlvide", error);

        if (error.code == "auth/invalid-email") {
          alert("El mail ingresado es invalido");
        };

        if (error.code == "auth/user-not-found") {
          alert("No hay email que se corresponda con el ingresado. Puede que el usuario haya borrado esa cuenta.")
        };
      })
    } else {
      alert("Ingrese un mail valido en el campo Email");
    }
  };

  // Perform the login action when the user submits the login form
  $scope.LogIn = function() {

    $scope.habilitado = false;

    firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).catch(function (error){

      $scope.habilitado = true;
      if(error.code === "auth/user-not-found"){
        alert("No estas registrado");
      }

      if(error.code === "auth/account-exists-with-different-credential"){
        alert('Ya estas registrado con un proveedor diferente para ese email.');
      }

      if(error.code === "auth/wrong-password"){
        alert("La contraseña es incorrecta");
      }

    }).then(function (respuesta){
      $timeout(function(){
        console.info("respuesta", respuesta);
        if(respuesta){
          $scope.habilitado = true;
          console.log(respuesta.emailVerified);
          //$scope.verificado = respuesta.emailVerified;
          var user = respuesta;

          /*if(respuesta.emailVerified == false){
            $scope.verificado = respuesta.emailVerified;
          }*/
          console.log(firebase.auth().currentUser);
        }
        
      })
    })

  };


  /*$scope.GoogleLogin = function(){

    $ionicPlatform.ready(function() {

      $timeout(function (){

      $ionicGoogleAuth.login()
      .then(function (respuesta){
        console.log(respuesta);

        $scope.usuarioGoogle = "exito";
      }).catch(function (error){
        console.log(error);

        $scope.usuarioGoogle = error;
      })

      })
      


    });

  };*/

  $scope.GoogleLogin = function(){

    $ionicPlatform.ready(function() {

      $timeout(function (){

        $ionicAuth.login('google')
          .then(function (respuesta){

            $scope.usuarioGoogle = $ionicUser.social.google.data;

          }).catch(function (error){

            $scope.usuarioGoogle = error;

          })

      })
      


    });

  };


  $scope.GitHubLogin = function(){

  	console.log("GITHUB LOGIN");

    $ionicPlatform.ready(function() {

      $timeout(function (){

      $ionicAuth.login('github')
        .then(function (respuesta){

          $scope.usuarioGithub = $ionicUser.social.github.data;

        }).catch(function (error){

          $scope.usuarioGithub = error;

        })

      })

    });

  };



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/ingreso.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true,
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.$on('$ionicView.enter', function(e) {
    $scope.modal.show();
    $scope.habilitado = true; //spinner login
    $scope.habilitadoRegister = true; //spinner register
  })

});
