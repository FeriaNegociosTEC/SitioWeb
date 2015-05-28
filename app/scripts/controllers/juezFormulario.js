'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:JuezFormularioCtrl
 * @description
 * # JuezFormularioCtrl
 * Controller of the feriaNegociosTecApp
 */


angular.module('feriaNegociosTecApp')
  .controller('JuezFormularioCtrl', function ($scope,$location,$http,alertService,preguntasService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var url=globarVar.url;
    var key=localStorage.getItem('Key');
    var juezId=localStorage.getItem('JuezId');

    preguntasService.getPreguntas(key,1,function(data){
      $scope.etapa1=data.tipo_calificacion;
    });
    preguntasService.getPreguntas(key,2,function(data){
      $scope.etapa2=data.tipo_calificacion;
    });

    $scope.volver=function(){
      $location.path('/juez/proyectos');
    };

  });