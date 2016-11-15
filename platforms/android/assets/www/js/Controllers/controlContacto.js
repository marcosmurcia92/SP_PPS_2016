angular.module('app.controllers')

.controller('contactanosCtrl', function ($scope, $stateParams, firebase, UsuarioDelorean) {
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

	$scope.selected = 1;
	$scope.contacto = {
		motivo: 1,
		denuncia: 167481,
		velocidad: '50',
		predisposicion: '50',
		personal:'75'
	};
	console.info($scope.contacto);

	$scope.EnviarReclamo = function(){
		if($scope.contacto.motivo != 1){
			$scope.contacto.denuncia = $scope.contacto.velocidad = $scope.contacto.predisposicion = $scope.contacto.personal= null;
		}
		$scope.contacto.usuario = UsuarioDelorean.getName();
		
		console.info($scope.contacto);

		var referencia = firebase.database().ref('reclamos');
  		var referenciaFirebase = referencia.push();
  		referenciaFirebase.set($scope.contacto, function(respuesta){
  			console.info(respuesta);
  			alert('Se subió su reclamo');
  		});
	}
});