angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('InicioCtrl', function($scope, $ionicModal, $timeout, $ionicGoogleAuth, $ionicUser, $ionicAuth, $ionicPlatform){

  $scope.loginData = {};
  $scope.VerLogin = true; //Variable booleana para cambiar de vista
  $scope.registerData = {};
  $scope.loginData.username = "";
  $scope.usuarioGoogle = {};
  $scope.usuarioGithub = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
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

})
