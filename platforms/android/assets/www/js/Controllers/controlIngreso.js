angular.module('app.controllers')

 .controller('ingresoCtrl',  function($scope, $ionicModal, $timeout, $state, $ionicGoogleAuth, $ionicUser, $ionicAuth, $ionicPlatform, SrvFirebase, UsuarioDelorean){

  $scope.holamundo = "HOLA!";
  $scope.loginData = {};
  $scope.VerLogin = true; //Variable booleana para cambiar de vista
  $scope.registerData = {};
  $scope.loginData.username = "";
  $scope.usuarioGoogle = {};
  $scope.usuarioGithub = {};
  $scope.respuestaToken = {};


  $scope.habilitado = true; //spinner login
  $scope.habilitadoRegister = true; //spinner register

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    try
    {
      FCMPlugin.subscribeToTopic('autopistasDelorean');
    }catch(error){
      console.log("FCM no disponible, estas en Web");
    }
    console.log("TRATO DE CERRARME");
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
        
        $scope.respuestaToken = respuesta;
        TraerUsuario();
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

    if (window.cordova) { // Si esta en el celular.

      $ionicPlatform.ready(function() {

        $timeout(function (){

          $ionicAuth.login('google')
            .then(function (respuesta){

              $scope.usuarioGoogle = $ionicUser.social.google.data;
              $scope.respuestaToken = $ionicUser.social.google.data;

              TraerUsuario();

            }).catch(function (error){

              $scope.usuarioGoogle = error;

            })

        })
      
      });

    } else { //Si esta en la web.


      if (!firebase.auth().currentUser) { //Si no esta logueado
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithPopup(provider).then(function(result) {

          if (result.credential) {
            var token = result.credential.accessToken;
          };
          //var token = result.credential.accessToken;
          var user = result.user;

          $scope.respuestaToken = result.user;

          console.log($scope.respuestaToken);

          TraerUsuario();




        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          alert(error);
          var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('Ya estas registrado con un proveedor diferente para ese email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            alert(error);
          }
        });

      } else {

        firebase.auth().signOut();
        UsuarioDelorean.login("", "", false);
      }

    } //Fin Google Web

    

  }; //Fin login Google


  $scope.GitHubLogin = function(){

    if (window.cordova) { //Si esta en el celular

      $ionicPlatform.ready(function() {

        $timeout(function (){

        $ionicAuth.login('github')
          .then(function (respuesta){

            $scope.usuarioGithub = $ionicUser.social.github.data;
            $scope.respuestaToken = $ionicUser.social.github.data;
            
            TraerUsuario();

          }).catch(function (error){

            $scope.usuarioGithub = error;

          })

        })

      });

    } else { //Si esta en la web

      if (!firebase.auth().currentUser) { //Si no esta logueado

        var provider = new firebase.auth.GithubAuthProvider();

        provider.addScope('repo');

        firebase.auth().signInWithPopup(provider).then(function(result) {

          var token = result.credential.accessToken;

          var user = result.user;

          $scope.respuestaToken = result.user;

          console.log($scope.respuestaToken);

          TraerUsuario();

        }).catch(function(error) {

          var errorCode = error.code;
          var errorMessage = error.message;

          var email = error.email;

          var credential = error.credential;
          alert(error);
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
              alert('Ya estas registrado con un proveedor diferente para ese email.');
              // If you are using multiple auth providers on your app you should handle linking
              // the user's accounts here.
            } else {
              alert(error);
            }
        });

      } else{

        firebase.auth().signOut();
        UsuarioDelorean.login("", "", false);

      }

    } //Fin GitHub Web

  }; //Fin login Github


  function TraerUsuario(){

    $timeout(function (){

      var usuarioBD = {};

      SrvFirebase.RefUsuarios().on('child_added', function Recorrer(snapshot){

        /*Esto, al ser asincronico es lo ultimo que se ejecuta...
         Asique si ANTES de agregar un usuario quiero comprobar si existe ese usuario en la base
         (Y esto se ejecuta al final) entonces el agregado del usuario a la base
         tiene que ser en este metodo, una vez que yo ya comprobe si existe o no ese usuario en la base.
         Pero no puedo agregar al usuario cada vez que recorro un elemento de la lista (on(child_added)).
         Para ello, lo que hice fue en obtener el ultimo elemento de la lista (limitToLast - Ver mas abajo).
         Dicho sea de paso, lo obtengo cada vez que leo un usuario (Eso es lo malo). 
         De cualquier forma, cuando obtengo el ultimo
         elemento de la lista lo comparo con el elemento que estoy recorriendo actualmente.
         Si concide significa que estoy en el ultimo elemento de la lista.
         Entonces si estoy en el ultimo elemento de la lista y el factory UsuarioDelorean
         continua sin inicializarse significa que el usuario no esta en la base. 
         Una vez alli, se agrega el elemento a la base.*/

        /*if ($scope.respuestaToken.email != null) {

          alert($scope.respuestaToken.email);

        } else {

          alert($scope.respuestaToken.username);

        }*/

        if (snapshot.val() != null && $scope.respuestaToken.email != null) {

          usuarioBD = snapshot.val();

          //console.info("Yo soy el usuario que se esta recorriendo", usuarioBD);

          if (usuarioBD.email == $scope.respuestaToken.email) {

            UsuarioDelorean.login($scope.respuestaToken.email, $scope.respuestaToken.email, usuarioBD.soyAdmin)

            $scope.closeLogin();

          }

        } else if (snapshot.val() != null && $scope.respuestaToken.username != null) { //SE pone else if porque Google mobile me devuelve Email y Username

          usuarioBD = snapshot.val();

          //console.info("Yo soy el usuario que se esta recorriendo", usuarioBD);

          if (usuarioBD.nombre == $scope.respuestaToken.username) {

            UsuarioDelorean.login($scope.respuestaToken.username, $scope.respuestaToken.username, usuarioBD.soyAdmin)
            
            $scope.closeLogin();

          };

        }

        


        SrvFirebase.RefUsuarios().limitToLast(1).on('child_added', function (snapshot){

          var ultimoUsuario = snapshot.val(); //ACa obtengo al ultimo usuario... Este se hace cada vez que se ejecuta el child_added de arriba!!!

          //console.info("Yo soy el ultimo usuario", ultimoUsuario);

          if (usuarioBD.mail == ultimoUsuario.mail) {

            var usuario = JSON.parse(UsuarioDelorean.getFullData());


            if (usuario.email == "") { //Si No se encontro al usuario en la base de datos.

              if ($scope.respuestaToken.email != null) {

                UsuarioDelorean.login($scope.respuestaToken.email, $scope.respuestaToken.email, false); //Aca Se inicializa al usuario cuando se loguea con Google WEB, Google Mobile o GitHub Web

              } else if ($scope.respuestaToken.username != null) {

                UsuarioDelorean.login($scope.respuestaToken.username, $scope.respuestaToken.username, false); //Aca se inicializa al usuario cuando se loguea con GitHub Mobile.

              }

              console.log(UsuarioDelorean.getFullData());

              usuario = JSON.parse(UsuarioDelorean.getFullData());

              SrvFirebase.RefUsuarios().push(usuario); //Como el usuario no estaba en la base de datos, se sube.

              SrvFirebase.RefUsuarios().off('child_added', Recorrer); //Como hice un push, se volveria a disparar el child_added 'Recorrer'.. Esto lo detiene.



            }

          };

        }) //fin limitToLast


      }) //fin child_added

      

    }) //Fin timeout

  } //Fin Traer Usuario



  

});