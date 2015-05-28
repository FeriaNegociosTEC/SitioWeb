'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:ProyectosCtrl
 * @description
 * # ProyectosCtrl
 * Controller of the feriaNegociosTecApp
 */

angular.module('feriaNegociosTecApp')
  .controller('ProyectosCtrl', function ($scope,$window,$location,$http,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var key=localStorage.getItem('Key');

    var url=globarVar.url;
    $scope.search={
      'categoria':undefined,
      'etapa':undefined,
    };
    $scope.categoria='Categoría';
    $scope.etapa='Etapa';

    //CATEGORIAS
    $http.get(url+'getCategorias',{params:{token:key}}).
    success(function(data,status){
      $scope.listCategorias=data.categoria_proyecto;
      $scope.listCategorias.push({'id':-1,'nombre':'Todas'});
      //console.log(listCategorias);
    }).
    error(function(data,status){
      console.log('error obteniendo Categorias del Servidor');
    });

    //PROYECTOS
    $http.get(url+'getProyectos',{params:{feria_fk:7,token:key}}).
      success(function(data,status){
        if(data.proyecto!=='token'){
          listProyectos=data.proyecto.lista;
          $scope.listProyectos = listProyectos;
          for (var i=0;i<$scope.listProyectos.length;i++){
              $scope.listProyectos[i].active=false;
              $scope.listProyectos[i].isSelected=false;
              $scope.listProyectos[i].icon='<span class="glyphicon glyphicon-plus"></span>';
          }
        }
        else{
            alertService.newAlert('token Invalido',true);
          }
      }).
      error(function(data,status){
        alertService.newAlert('error obteniendo Proyectos del Servidor',true);
      });

    $scope.listetapas=listetapas;

    $scope.verMas = function(proyecto,index) {
      index=listProyectos.indexOf(proyecto);
      //console.log(index);
      globarVar.currentProyecto=proyecto;
      $scope.listProyectos[index].active = !$scope.listProyectos[index].active;
      if($scope.listProyectos[index].icon ==='<span class="glyphicon glyphicon-plus"></span>'){
        $scope.listProyectos[index].icon ='<span class="glyphicon glyphicon-minus"></span>';
      }
      else{
        $scope.listProyectos[index].icon ='<span class="glyphicon glyphicon-plus"></span>';
      }
      //collapseAnother(index);
    };

    $scope.editar = function(proyecto) {
      globarVar.currentProyecto=proyecto;
      $location.path('/admin/proyectos/editar');
    };

    $scope.cetapa= function(name){
      if(name!=='Todas'){
        $scope.search.etapa=name;
      }
      else{
        $scope.search.etapa=undefined;
      }
      $scope.etapa=name;
      //console.log($scope.listProyectos);
      //console.log($scope.search.etapa);
    };

    $scope.cCategoria=function(name){
      if(name!=='Todas'){
        $scope.search.categoria=name;
      }
      else{
        $scope.search.categoria=undefined;
      }
      $scope.categoria=name;
    };

    $scope.isEtapa=function(element){
      return (element.etapa===$scope.search.etapa)||($scope.search.etapa===undefined);
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