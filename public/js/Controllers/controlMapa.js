angular.module('app.controllers')

.controller('mapaDeDenunciasCtrl', function ($scope, $stateParams,NgMap,$ionicPopup,SrvFirebase,$timeout,UsuarioDelorean) {


	var  usuario="Robertiño";
	var  fecha="10/10/2016";
	var urlImagen= "mg/mapa/marca";
	var referenciaDenuncia= SrvFirebase.RefDenuncias();
	$scope.cantidad=-1;
	$scope.map = {};
	$scope.map.name = "Alarmas";
	$scope.map.latitud = -34.6671999;
	$scope.map.longitud = -58.35926;
	$scope.marcas = []; 
	$scope.ArrayFiltros=[];
	for (var i=0;i<6;i++) {
		$scope.ArrayFiltros.push({estado:1});
	};
	referenciaDenuncia.once('value', function(snap) {
		$scope.cantidad=snap.numChildren();
	});
	referenciaDenuncia.on('child_added', function (snapshot) {
		$timeout(function(){
			var message = snapshot.val();
			message.mostrar=true;
			switch(message.tipoReclamo){
				case 1:
				message.tipoReclamo="Accidente";
				break;
				case 2:
				message.tipoReclamo="Averia";
				break;
				case 3:
				message.tipoReclamo="Animal";
				break;
				case 4:
				message.tipoReclamo="Ambulancia";
				break;
				case 5:
				message.tipoReclamo="Protesta";
				break;
				case 6:
				message.tipoReclamo="Obras";

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
	$scope.cambiarFiltro=function(num){
		var filtrarPor="";
		$scope.ArrayFiltros[num].estado=$scope.ArrayFiltros[num].estado==1?0.3:1;
		switch(num){
			case 0:
			filtrarPor="Accidente";
			break;
			case 1:
			filtrarPor="Ambulancia";
			break;
			case 2:
			filtrarPor="Animal";
			break;
			case 3:

			filtrarPor="Averia";
			break;
			case 4:
			filtrarPor="Obras";
			break;
			case 5:
			filtrarPor="Protesta";
			break;
		}
		$scope.marcas.forEach(function(marca) {
			if(filtrarPor==marca.tipoReclamo){
				marca.mostrar=marca.mostrar?false:true;
			}			
		});
	}
	





});