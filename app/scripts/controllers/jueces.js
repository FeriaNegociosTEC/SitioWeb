'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('JuecesCtrl', function ($scope,$location,$http,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  var url=globarVar.url;
  var key=localStorage.getItem('Key');

  $http.get(url+'getJueces',{params:{token:key}}).
  success(function(data,status){
    if(data.juez!=='token'){
      listJueces=data.juez;
      $scope.listJueces=listJueces;  
      for (var i=0;i<$scope.listJueces.length;i++){
        $scope.listJueces[i].active=false;
        $scope.listJueces[i].icon='<span class="glyphicon glyphicon-plus"></span>';
        $scope.listJueces[i].password=$scope.listJueces[i].nombre.substring(0,3)+$scope.listJueces[i].apellido1.substring(0,3)+$scope.listJueces[i].apellido2.substring(0,3)+$scope.listJueces[i].id;
        $scope.listJueces[i].password=$scope.listJueces[i].password.toLowerCase();
      }
    }
  }).
  error(function(data,status){
    alertService.newAlert('error obteniendo Jueces');
  });    
  $scope.verMas = function(juez,index) {
      globarVar.currentJuez=juez;
      $scope.listJueces[index].active = !$scope.listJueces[index].active;
      if($scope.listJueces[index].icon ==='<span class="glyphicon glyphicon-plus"></span>'){
        $scope.listJueces[index].icon ='<span class="glyphicon glyphicon-minus"></span>';
      }
      else{
        $scope.listJueces[index].icon ='<span class="glyphicon glyphicon-plus"></span>';
      }
      collapseAnother(index);
    };

	$scope.crearJuez=function(){
		$location.path('/admin/jueces/crear');
	};

	$scope.agregarProyecto=function(juez){
    globarVar.currentJuez=juez;
    $location.path('/admin/jueces/asignarProyecto');
	};

	$scope.editarJuez=function(juez){
		globarVar.currentJuez=juez;
  	//$window.alert(globarVar.currentProyecto.nombre);
  	$location.path('/admin/jueces/editar');
	};

  var collapseAnother = function(index){
        for(var i=0; i<$scope.listJueces.length; i++){
            if(i!==index){
                $scope.listJueces[i].active = false;
                $scope.listJueces[i].icon ='<span class="glyphicon glyphicon-plus"></span>';
            }
        }
    };

  });

