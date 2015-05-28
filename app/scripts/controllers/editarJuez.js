'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:EditarJuezCtrl
 * @description
 * # EditarJuezCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('EditarJuezCtrl', function ($scope,$location,$http,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var key=localStorage.getItem('Key');

    $scope.juez=globarVar.currentJuez;
    var url=globarVar.url;
    $scope.volver=function(){
    	$location.path('/admin/jueces');
    };

    $scope.finalizar=function(){
      var formData={
        token:key,
        nombre:$scope.juez.nombre,
        apellido1:$scope.juez.apellido1,
        apellido2:$scope.juez.apellido2,
        password:$scope.juez.password,
        usuario:$scope.juez.usuario,
        id:$scope.juez.id
      };
      //console.log(formData);
      $http.put(url+'editJuez',formData).
      success(function(data,status){
        alertService.newAlert('Se ha editado el juez con exito',false);
        $location.path('/admin/jueces');
      }).
      error(function(data,status){
        alertService.newAlert('Error en la edición',true);
      });
    };

    $scope.eliminar=function(){
      $http.delete(url+'deleteJuez',{params:{id:$scope.juez.id,token:key}}).
      success(function(data,status){
        alertService.newAlert('Se ha eliminado el juez con exito',false);
        $location.path('/admin/jueces');
      }).
      error(function(data,status){
        console.log(status);
      });
    };
  });
