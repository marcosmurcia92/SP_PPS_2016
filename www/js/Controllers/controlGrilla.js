angular.module('app.controllers')

.controller('grillaCtrl', function($scope,$state, $timeout,SrvFirebase,UsuarioDelorean,$ionicPopup,$ionicHistory) {
    /*Parte  de  diseño  de los botones aca no hay que tocar  */
    var switchButton    = document.querySelector('.switch-button');
    var switchBtnRight  = document.querySelector('.switch-button-case.right');
    var switchBtnLeft   = document.querySelector('.switch-button-case.left');
    var activeSwitch = document.querySelector('.active');
    function switchLeft(){
        switchBtnRight.classList.remove('active-case');
        switchBtnLeft.classList.add('active-case');
        activeSwitch.style.left= '0%';
    }

    function switchRight(){
        switchBtnRight.classList.add('active-case');
        switchBtnLeft.classList.remove('active-case');
        activeSwitch.style.left= '50%';
    }
    switchBtnLeft.addEventListener('click', function(){
        switchLeft();
    }, false);

    switchBtnRight.addEventListener('click', function(){
        switchRight();
    }, false); 

    /*Parte  de la logica de las grillas  */
    /*Verifico  si  es admin */
    if(!UsuarioDelorean.isAdmin()){
        $ionicPopup.alert({
           template: "<style>.popup {width: 200px !important; height:200px;}  </style> ",
           title: 'Usted no eres  administrador',
           template: 'No puedes ver la grilla, lo siento'
       });
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go( "menu.mapaDeDenuncias");

    }
    $scope.isLeft=true;/*Esto es parte del diseño para ver si muestro  denuncia o reclamo */
    var referenciaDenuncia= SrvFirebase.RefDenuncias();
    $scope.GDenucias=[];
    $scope.GReclamos=[];

    referenciaDenuncia.on('child_added', function (snapshot) {
        $timeout(function(){
            var  denucia={};
            var message = snapshot.val();
            denucia.ingreso= darFecha ( new Date(message.fechaIngreso));
            denucia.suceso= darFecha (new Date(message.fechaSuceso));
            denucia.requierePolicia= message.requierePolicia==true?"SI":"NO";
            $scope.GDenucias.push(denucia);
        })

    });
    var darFecha= function(fecha){
        var dia= fecha.getDate()<10? "0"+ fecha.getDate(): fecha.getDate();
        var mes= fecha.getMonth()+1<10? "0"+ (fecha.getMonth()+1): fecha.getMonth()+1;
        return dia+"-"+ mes+"-"+ fecha.getFullYear();
    }

});