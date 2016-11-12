angular.module('app.controllers')

.controller('autoresCtrl', function ($scope, $stateParams,$cordovaInAppBrowser) {

	var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };

	$scope.OpenGitHub=function(username){
		//EN WEB
		//$window.open('https://www.google.com', '_blank');


		//EN CELULAR
		$cordovaInAppBrowser.open('https://github.com/'+username+'/', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });
	};

});