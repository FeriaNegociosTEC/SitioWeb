'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:AsignarProyectoCtrl
 * @description
 * # AsignarProyectoCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('AsignarProyectoCtrl', function ($scope,$window,$location,$http,alertService,categoriaService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var key=localStorage.getItem('Key');
    $scope.juez=globarVar.currentJuez;

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
            alertService.newAlert('Sesión Expirada',true);
          }
      }).
      error(function(data,status){
        alertService.newAlert('error obteniendo Proyectos del Servidor',true);
      });

    $scope.listetapas=listetapas;
    ///
    ///
    $scope.asignar=function(proyecto){
      var urlReg = url+'agregarJuezProyecto';
      var formData = {
        'juez_fk':$scope.juez.id,
        'proyecto_fk':proyecto.id,
        'token':key
      };
      $http.post(urlReg,formData).
      success(function(data,status){
        alertService.newAlert('Se ha asignado el proyecto correctamente',false);
        $location.path('/admin/jueces');
      }).
      error(function(data,status){
        alertService.newAlert('La asignación falló',true);
        console.log(status);
      });
    };
    
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

    $scope.volver=function(){
      $location.path('/admin/jueces');
    };
    
  });