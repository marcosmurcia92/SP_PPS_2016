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
           title: 'Usted no es administrador',
           template: 'No puedes ver la grilla, lo siento'
       });
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go( "menu.mapaDeDenuncias");

    }
    $scope.isLeft=true;/*Esto es parte del diseño para ver si muestro  denuncia o reclamo */
    var referenciaDenuncia= SrvFirebase.RefDenuncias();
    $scope.DenuConfigColum= [
    { field: 'usuario', name: 'usuario',minWidth: 90},
    { field: 'tipoReclamo', name: 'tipo reclamo',minWidth: 90},
    { field: 'estado', name: 'estado'
    ,cellTemplate:'<a style="width:100%" class="action-button shadow animate yellow" ng-click="grid.appScope.CambiarEstado(row.entity,grid.renderContainers.body.visibleRowCache.indexOf(row))" ><i class="glyphicon glyphicon-erase">&nbsp;{{row.entity.estado}}</i></a>'
    , enableFiltering: false}
    ];
    $scope.ReclaConfigColum= [ { field: 'denuncia', name: 'Denuncia',minWidth: 90},
    { field: 'personal', name: 'Personal',minWidth: 90},
    { field: 'predisposicion', name: 'predisposicion',minWidth: 90},
    ]
    $scope.CambiarEstado=function(denuncia,index){
        switch(denuncia.estado){
            case "Pendiente":
            referenciaDenuncia.child(denuncia.key).update({  "estado":'Activo'});
            denuncia.estado="Activo";
            break;
            case "Activo":
            referenciaDenuncia.child(denuncia.key).update({  "estado":'Inactivo'});
            denuncia.estado="Inactivo";
            break;
            case "Inactivo":
            referenciaDenuncia.child(denuncia.key).update({  "estado":'Pendiente'});
            denuncia.estado="Pendiente";
            break;
        }

        console.log(index);

    }
    $scope.DarTabla= function (){
        return [
        { field: 'usuario', name: 'usuario',minWidth: 90},


        ];
    }

    $scope.GDenucias=[];
    $scope.GReclamos=[];
    $scope.cantidadD=-1;
    $scope.cantidadR=-1;
    $scope.GDenucias.paginationPageSizes = [25, 50, 75];
    $scope.GDenucias.paginationPageSize = 25;
   // $scope.GDenucias.columnDefs=DarTabla();
    //Parte spinner y firebase para traer los datos
   /* var prueba= referenciaDenuncia.child("2jqn_RBBic1WoNxf");
    prueba.update({
      "nicaSkname": "333"
  });*/
   // referenciaDenuncia.child("auctions").update({a: true});
   referenciaDenuncia.once('value', function(snap) {
    $scope.cantidad=snap.numChildren();
    $scope.cantidadD=snap.numChildren();
});

   SrvFirebase.RefReclamos().once('value', function(snap) {
    $scope.cantidad=snap.numChildren();
    $scope.cantidadR=snap.numChildren();
});
   /*Traigo  los datos de las denuncia  */ 
   referenciaDenuncia.on('child_added', function (snapshot) {
    $timeout(function(){
        var  denucia={};
        var message = snapshot.val();
        switch(message.tipoReclamo){
            case 1:
            message.tipoReclamo="Accidente";
            break;
            case 2:
            message.tipoReclamo="Averia";
            break;
            case 3:
            message.tipoReclamo="Animal";
            break;
            case 4:
            message.tipoReclamo="Ambulancia";
            break;
            case 5:
            message.tipoReclamo="Protesta";
            break;
            case 6:
            message.tipoReclamo="Obras";

            break;
        }

        denucia.key=snapshot.key
        denucia.usuario=message.usuario;
        denucia.tipoReclamo=message.tipoReclamo;
        denucia.estado=message.estado;
        $scope.GDenucias.push(denucia);
    })
});

   /*Traigo  los datos de los reclamos */
   SrvFirebase.RefReclamos().on('child_added', function (snapshot) {
    $timeout(function(){
        var  denucia={};
        var message = snapshot.val();
        console.log(snapshot.val());
        $scope.GReclamos.push(message);
    })

});
   var darFecha= function(fecha){
    var dia= fecha.getDate()<10? "0"+ fecha.getDate(): fecha.getDate();
    var mes= fecha.getMonth()+1<10? "0"+ (fecha.getMonth()+1): fecha.getMonth()+1;
    return dia+"-"+ mes+"-"+ fecha.getFullYear();
}

});