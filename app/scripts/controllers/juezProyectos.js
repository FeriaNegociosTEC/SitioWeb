'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:JuezProyectosCtrl
 * @description
 * # JuezProyectosCtrl
 * Controller of the feriaNegociosTecApp
 */

angular.module('feriaNegociosTecApp')
  .controller('JuezProyectosCtrl', function ($scope,$window,$location,$http,thisProyecto,categoriaService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var key=localStorage.getItem('Key');
    var juezId=localStorage.getItem('JuezId');
    var url=globarVar.url;
    $scope.search={
      'categoria':undefined,
      'etapa':undefined,
    };
    $scope.categoria='Categoría';
    $scope.etapa='Etapa';

    //CATEGORIAS
    categoriaService.getCategorias(function(data){
      $scope.listCategorias=data.categoria_proyecto;
      $scope.listCategorias.push({'id':-1,'nombre':'Todas'});
    });

    //PROYECTOS
    $http.get(url+'getMisProyectos',{params:{token:key,juez_fk:juezId}}).
      success(function(data,status){
        listProyectos=data.proyectos;
        $scope.listProyectos = listProyectos;
        for (var i=0;i<$scope.listProyectos.length;i++){
          $scope.listProyectos[i].active=false;
          $scope.listProyectos[i].icon='<span class="glyphicon glyphicon-plus"></span>';
        }
      }).
      error(function(data,status){
        console.log('error obteniendo Proyectos del Servidor');
      });

/*
    $scope.listProyectos=proyectos;
    for (var i=0;i<$scope.listProyectos.length;i++){
          $scope.listProyectos[i].active=false;
          $scope.listProyectos[i].icon='<span class="glyphicon glyphicon-plus"></span>';
        }*/
    $scope.listetapas=listetapas;

    $scope.verMas = function(proyecto,index) {
      index=$scope.listProyectos.indexOf(proyecto);
      //console.log(index);
      //TODO globarVar.currentProyecto=proyecto;
      $scope.listProyectos[index].active = !$scope.listProyectos[index].active;
      if($scope.listProyectos[index].icon ==='<span class="glyphicon glyphicon-plus"></span>'){
        $scope.listProyectos[index].icon ='<span class="glyphicon glyphicon-minus"></span>';
      }
      else{
        $scope.listProyectos[index].icon ='<span class="glyphicon glyphicon-plus"></span>';
      }
      //collapseAnother(index);
    };

    $scope.juzgar=function(pProyecto){
      thisProyecto.proyecto=pProyecto;
      $location.path('/juez/proyectos/juzgar');
    };
    
    $scope.getArray=function(proyecto){
      var array=[{
        nombre:proyecto.nombre,
        id:proyecto.id,
        categoria:proyecto.categoria,
        etapa:proyecto.etapa,
        descripcion: proyecto.descripcion,
        motivacion:proyecto.motivacion,
        ventajas:proyecto.ventajas,
        estudiantes:''
      }];
      for (var i=0;i<proyecto.estudiantes.length;i++){
        array.estudiantes+=proyecto.estudiantes[i].nombre+' '+proyecto.estudiantes[i].apellido1+' '+proyecto.estudiantes[i].apellido2+' '+proyecto.estudiantes[i].carnet;
      }
      return array;
    };

    $scope.getHeader=function(){
      var array=['Nombre','ID','Categoria','Etapa','Descripcion','Motivacion','Ventajas','Estudiantes'];
      return array;
    };

    var collapseAnother = function(index){
        for(var i=0; i<$scope.listProyectos.length; i++){
            if(i!==index){
                $scope.listProyectos[i].active = false;
                $scope.listProyectos[i].icon ='<span class="glyphicon glyphicon-plus"></span>';
            }
        }
    };
});