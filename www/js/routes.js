angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.denunciaUnEvento', {
    url: '/nuevaDenuncia',
    views: {
      'side-menu21': {
        templateUrl: 'templates/denunciaUnEvento.html',
        controller: 'denunciaUnEventoCtrl'
      }
    }
  })

  .state('menu.mapaDeDenuncias', {
    url: '/mapa',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mapaDeDenuncias.html',
        controller: 'mapaDeDenunciasCtrl'
      }
    }
  })

  .state('menu.contactanos', {
    url: '/contacto',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contactanos.html',
        controller: 'contactanosCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  // .state('ingreso', {
  //   url: '/login',
  //   templateUrl: 'templates/ingreso.html',
  //   controller: 'ingresoCtrl'
  // })

$urlRouterProvider.otherwise('/side-menu21/nuevaDenuncia')

  

});