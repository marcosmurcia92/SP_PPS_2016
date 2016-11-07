angular.module('app.controllers')

.controller('mapaDeDenunciasCtrl', function ($scope, $stateParams,NgMap,$ionicPopup,SrvFirebase,$timeout) {
	var  usuario="Robertiño";
	var  fecha="10/10/2016";
	var referenciaDenuncia= SrvFirebase.RefDenuncias();
	$scope.map = {};
	$scope.map.name = "Alarmas";
	$scope.map.latitud = -34.6671999;
	$scope.map.longitud = -58.35926;
	$scope.marcas = []; 
	referenciaDenuncia.on('child_added', function (snapshot) {
		$timeout(function(){
			var message = snapshot.val();
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
			templateUrl: 'templates/popupInformacion.html',
			title: 'Informacion',
			subTitle: 'Datos de lo que ha pasado',
			scope: $scope
		});
	}





});