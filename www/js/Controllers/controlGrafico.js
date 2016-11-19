angular.module('app.controllers')

.controller('graficosCtrl', function ($scope, $stateParams,SrvFirebase) {
	
	//GRAFICO DE DENUNCIAS:
	//Cantidad total de denuncias
	// Denuncias Rechazadas.
	// Denuncias Activas (Separadas por tipo) 
	//[*Emergencia Medica, *Accidente de Transito, *Animales, Obras, Protestas]

	var cantTotal = 0;
	var cantRechazadas = 0;
	var cantAccidentes = 0;
	var cantAverias = 0;
	var cantAnimales = 0;
	var cantMedicas = 0;
	var cantProtestas = 0;
	var cantObras = 0;

	SrvFirebase.RefDenuncias().on('child_added', function (snapshot) {
        var message = snapshot.val();
        cantTotal++;
        if(message.estado == 'Inactivo'){
        	cantRechazadas++;
        }else{
        	switch(message.tipoReclamo){
  			case 1:
  				cantAccidentes++;
  				break;
  			case 2:
  				cantAverias++;
  				break;
  			case 3:
  				cantAnimales++;
  				break;
  			case 4:		  		
		  		cantMedicas++;
		  		break;
		  	case 5:
		  		cantProtestas++;
		  		break;
		  	case 6:
			  	cantObras++;
		  		break;
  			}
        }
    });

	$scope.labels = ["Rechazadas", "Accidentes de Tránsito", "Averias de Vehículo", "Animales Sueltos", "Emergencias Médicas", "Protestas Públicas", "Obras en Construcción"];
  	$scope.data = [cantRechazadas, cantAccidentes, cantAverias, cantAnimales, cantMedicas, cantProtestas, cantObras];

});