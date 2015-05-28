'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:EtapasCtrl
 * @description
 * # EtapasCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('EtapasCtrl', function ($scope,$location,$http,alertService,categoriaService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var key=localStorage.getItem('Key');
    var listProyectos;

    $scope.search={
      'categoria':undefined,
    };
    $scope.categoria='Categoría';
    $scope.calificacion={
      texto: 'Ordenar por calificacion <span class="glyphicon glyphicon-triangle-bottom"></span>',
      orden: true};

    var url=globarVar.url;

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

    $scope.finalizar=function(){
      var formData;
      for (var i=0;i<$scope.listProyectos.length;i++){
          if($scope.listProyectos[i].isSelected){
            formData={
              feria_id:7,
              proyecto_id:$scope.listProyectos[i].id,
              token:key,
            };
            pasarEtapaProyecto(formData,i);
          }
        }
        $location.path('/admin/proyectos');
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
      return (element.etapa!==2);
    };

    var collapseAnother = function(index){
        for(var i=0; i<$scope.listProyectos.length; i++){
            if(i!==index){
                $scope.listProyectos[i].active = false;
                $scope.listProyectos[i].icon ='<span class="glyphicon glyphicon-plus"></span>';
            }
        }
    };

    var pasarEtapaProyecto=function(formData,i){
      console.log('pasando');
      $http.post(url+'admiPasarProyectoEtapa',formData).
            success(function(data,status){
              console.log('Se ha pasado de etapa con exito');
              alertService.newAlert('Se ha pasado de etapa con éxito',false); 
            }).
            error(function(data,status){
              alertService.newAlert('error en el procedimiento',true);
            });
    };
  });
