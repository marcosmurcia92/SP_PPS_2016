angular.module('app.controllers')

.controller('mapaDeDenunciasCtrl', function ($scope, $stateParams,NgMap,$ionicPopup,SrvFirebase,$timeout,UsuarioDelorean) {
	var  usuario="Robertiño";
	var  fecha="10/10/2016";
	var urlImagen= "mg/mapa/marca";
	var referenciaDenuncia= SrvFirebase.RefDenuncias();
	$scope.map = {};
	$scope.map.name = "Alarmas";
	$scope.map.latitud = -34.6671999;
	$scope.map.longitud = -58.35926;
	$scope.marcas = []; 
	referenciaDenuncia.on('child_added', function (snapshot) {
		$timeout(function(){
			var message = snapshot.val();
			switch(message.tipoAccidente){
				case "":
				break;
				case "":
				break;
				case "":
				break;
				case "":
				break;
				case "":
				break;
			}
			$scope.marcas.push(message);
		})

	});

	$scope.MostrarInformacion=function( dato){
		var fecha=	new Date(dato.fechaIngreso);
		var dia= fecha.getDate()<10? "0"+ fecha.getDate(): fecha.getDate();
		var mes= fecha.getMonth()<10? "0"+ (fecha.getMonth()+1): fecha.getMonth()+1;
		dato.fechaIngreso=  dia+"-"+ mes+"-"+ fecha.getFullYear();
		$scope.informacion=dato;
		$ionicPopup.alert({
			template: "<style>.popup {width: 1000px !important; height:400px;} </style>",
				templateUrl: 'templates/popupInformacion.html',
				title: 'Informacion',
				subTitle: 'Datos de lo que ha pasado',
				scope: $scope
			});
	}





});