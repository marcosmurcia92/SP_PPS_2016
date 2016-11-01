angular.module('app.controllers', [])

.controller('denunciaUnEventoCtrl', function ($scope, $stateParams) {


})

.controller('mapaDeDenunciasCtrl', function ($scope, $stateParams,NgMap) {
	$scope.map = {};
	$scope.map.name = "Alarmas";
	$scope.map.latitud = -34.6671999;
	$scope.map.longitud = -58.35926;
	$scope.marcas = [];
	for (var i = 0; i < 10; i++) {
		var longi=Math.random();
		var lati= Math.random();
		console.log((-30.1347676-lati)+"-"+(-45.6016699-longi))
		///console.log(Math.random());
		//console.log(Math.floor((Math.random()*100) + 1));
		$scope.marcas.push({lati:(- 35.6016699+lati)
		, longi:( -59.1347676+longi)})
	};


})

.controller('contactanosCtrl', function ($scope, $stateParams) {


})

.controller('menuCtrl', function ($scope, $stateParams) {


})

.controller('ingresoCtrl',  function ($scope, $stateParams) {


})
