angular.module('app.controllers', ['firebase', 'ngCordova'])

.controller('menuCtrl', function($state, $scope, $ionicModal, $timeout, $ionicAuth, $ionicPlatform, UsuarioDelorean) {

	

	// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/ingreso.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true,
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.modal = modal;
    openLogin();
  });

  // $scope.$on('$ionicView.enter', function(e) {
  //   openLogin();
  // })

  

  function openLogin(){
  	$scope.modal.show();
  } 

	$scope.Logout = function(){

		//console.log("Deslogueado!!");

		console.info("ionicAuth", $ionicAuth);

		console.info("firebase", firebase.auth().currentUser);


		if (firebase.auth().currentUser != null) {

			firebase.auth().signOut().then(function(rta){
				console.info("LOGOUT",rta);
				UsuarioDelorean.login("", "", false);
				$state.go('menu.denunciaUnEvento');
				openLogin();
			});

		}else if($ionicUser.social.github.data != null || $ionicUser.social.google.data != null){
			$ionicAuth.logout();
			$state.go('menu.denunciaUnEvento');
			openLogin();
		};
	};

 });