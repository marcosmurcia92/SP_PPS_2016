angular.module('app.controllers')

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

});