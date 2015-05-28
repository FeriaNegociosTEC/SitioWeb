'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:CrearJuezCtrl
 * @description
 * # CrearJuezCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('CrearJuezCtrl', function ($scope,$location,$http,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
    var key=localStorage.getItem('Key');
    var url=globarVar.url;

    $scope.volver=function(){
    	$location.path('/admin/jueces');
    };

    $scope.finalizar=function(){
      var urlReg = url+'setJuez';
      var formData = {
        'token':key,
        'nombre':$scope.juez.nombre,
        'apellido1':$scope.juez.apellido1,
        'apellido2':$scope.juez.apellido2,
      };
      $http.post(urlReg,formData).
      success(function(data,status){
        alertService.newAlert('Se ha creado el juez con éxito',false);
        $location.path('/admin/jueces');
      }).
      error(function(data,status){
        alertService.newAlert('Error en la creación',true);
        console.log(status);
      });
    };
  });
