'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:JuezJuzgarCtrl
 * @description
 * # JuezJuzgarCtrl
 * Controller of the feriaNegociosTecApp
 */


angular.module('feriaNegociosTecApp')
  .controller('JuezJuzgarCtrl', function ($scope,$location,$http,alertService,thisProyecto,preguntasService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var url=globarVar.url;
    var key=localStorage.getItem('Key');
    var juezId=localStorage.getItem('JuezId');
    var succeded=0;

    
    $scope.proyecto=thisProyecto.proyecto;
    preguntasService.getPreguntas(key,$scope.proyecto.etapa,function(data){
      $scope.etapa=data.tipo_calificacion;
    });


    $scope.volver=function(){
      $location.path('/juez/proyectos');
    };

    $scope.finalizar=function(){
      for(var i=0;i<$scope.etapa.length;i++){
        //console.log(juezId,$scope.proyecto.id,$scope.etapa[i].id,$scope.etapa[i].nota,key,callback);
        preguntasService.responderPreguntas(juezId,$scope.proyecto.id,$scope.etapa[i].id,($scope.etapa[i].nota*$scope.etapa[i].valor)/100,key,callback);
      }
      if(succeded===$scope.etapa.length){
        alertService.newAlert('Éxito',false);
        $location.path('/juez/proyectos');
      }
    };

    var callback=function(data){
          succeded++;
        };


  });
