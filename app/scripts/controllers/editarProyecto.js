'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:EditarProyectoCtrl
 * @description
 * # EditarProyectoCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('EditarProyectoCtrl', function ($scope,$location,$http,alertService,categoriaService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    var url=globarVar.url;
    var key=localStorage.getItem('Key');

    $scope.currentCategoriaId =null;
    $scope.currentSedeId=null;$scope.currentCarreraId =null;
    $scope.currentCategoria='Categoría';
    $scope.currentSede='Sede';
    $scope.currentCarrera='Carrera';
    //Get Categorias
    categoriaService.getCategorias(function(data){
      $scope.listCategorias=data.categoria_proyecto;
      $scope.listCategorias.push({'id':-1,'nombre':'Todas'});
    });

    //get Sedes
    $http.get(url+'getSedes').
    success(function(data,status){
      listSedes=data.sede;
      $scope.listSedes=data.sede;
    }).
    error(function(data,status){
      alert('error obteniendo Sedes del Servidor');
    });
    // acomodar botones y funciones
    $scope.participantes=[];
    $scope.agregando=false;
    $scope.icon='<span class="glyphicon glyphicon-plus"></span>';
    $scope.proyecto=globarVar.currentProyecto;

    $scope.volver=function(){
    	$location.path('/admin/proyectos');
    };

    $scope.eliminarProyecto=function(){
      $http.delete(url+'deleteProyecto',{params:{proyecto_id:$scope.proyecto.id,token:key}}).
      success(function(data,status){
        console.log('Exito');
        $location.path('/admin/proyectos');
      }).
      error(function(data,status){
        console.log('error eliminando');
      });
    };

    $scope.beginAgregar=function(){
      if ($scope.participantes.length<=10){
        $scope.agregando=!$scope.agregando;
        if($scope.icon ==='<span class="glyphicon glyphicon-plus"></span>'){
            $scope.icon ='<span class="glyphicon glyphicon-minus"></span>';
          }
          else{
            $scope.icon ='<span class="glyphicon glyphicon-plus"></span>';
          }
      }
      else{
        $scope.icon ='<span class="glyphicon glyphicon-remove"></span>';
      }
    };
    $scope.agregarParticipante=function(participante){ 
      $scope.participante.carrera_fk=$scope.currentCarreraId;
      $scope.participante.sede_fk=$scope.currentSedeId;
      //$scope.participantes.push(angular.copy(participante));
      var formData = {
        'nombre':$scope.participante.nombre,
        'apellido1':$scope.participante.apellido1,
        'apellido2':$scope.participante.apellido2,
        'carnet':$scope.participante.carnet,
        'email':$scope.participante.email,
        'telefono':$scope.participante.telefono,
        'carrera_fk':$scope.currentCarreraId,
        'sede_fk':$scope.currentSedeId,
        'proyecto_fk':$scope.proyecto.id,
        'token':key
      };
      $http.post(url+'agregarEstudiantesProyecto',formData).
      success(function(data,status){
        $scope.agregando=false;
        $scope.proyecto.estudiantes.push(angular.copy($scope.participante));
        $scope.participante={};
        $scope.icon='<span class="glyphicon glyphicon-plus"></span>';
        alertService.newAlert('Se agregó el participante con éxito',false);
      }).
      error(function(data,status){
        alertService.newAlert('Operación fallida',true);
        console.log(status);
      });
    };

    $scope.eliminarParticipante=function(participante){
      $http.delete(url+'deleteEstudianteProyecto',{params:{proyecto_fk:$scope.proyecto.id,carnet:participante.carnet,token:key}}).
      success(function(data,status){
        alertService.newAlert('Participante eliminado',false);
        console.log(status);
      }).
      error(function(data,status){
        alertService.newAlert('Operación fallida',true);
        console.log(status);
      });
    };

    $scope.finalizar=function(){
      if(!!$scope.currentCategoriaId){

      }
      var formData={
        id:$scope.proyecto.id,
        nombre:$scope.proyecto.nombre,
        descripcion:$scope.proyecto.descripcion,
        motivacion:$scope.proyecto.motivacion,
        ventajas:$scope.proyecto.ventajas,
        categoria_fk:$scope.currentCategoriaId,
        feria_fk:7,
        token:key,
        otrosDetalles:''
      };
      console.log(formData);
      $http.put(url+'editProyecto',formData).
      success(function(data,status){
        alertService.newAlert('Se edito el proyecto con éxito',false);
        $location.path('/admin/proyectos');
      }).
      error(function(data,status){
        alertService.newAlert('Operación fallida',true);
        console.log(status);
      });
    };

    //Botones de las 
    $scope.cCategoria=function(categoriaid,categoriaNombre){
      $scope.currentCategoria=categoriaNombre;
      $scope.currentCategoriaId=categoriaid;
    };
    $scope.cSede=function(sedeid,sedeNombre){
      $scope.currentSedeId=sedeid;
      $scope.currentSede=sedeNombre;

      url=globarVar.url;
      $http.get(url+'getCarrerasBySede',{params:{sede_fk:sedeid}}).
      success(function(data,status){
        listCarreras=data.carrera;
        $scope.listCarreras=data.carrera;
      }).
      error(function(data,status){
        console.log('error');
      });
    };

    $scope.cCarrera=function(carreraid,carreraNombre){
      $scope.currentCarrera=carreraNombre;
      $scope.currentCarreraId=carreraid;
    };

    var chooseCategoria=function(){
      for(var i=0;i<$scope.listCategorias.length;i++){
        if($scope.listCategorias[i].nombre===$scope.proyecto.categoria){
          $scope.currentCategoria=$scope.listCategorias[i].nombre;
          $scope.currentCategoriaId=$scope.listCategorias[i].id;

        }
      }
      
    };

  });
