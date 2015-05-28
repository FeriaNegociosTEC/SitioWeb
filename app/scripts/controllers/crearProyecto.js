'use strict';
/*jshint unused: false, undef:false */
/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:CrearProyectoCtrl
 * @description
 * # CrearProyectoCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('CrearProyectoCtrl', function ($scope,$http,$templateCache,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var proyectoID=null;

    $scope.currentCategoriaId =null; $scope.currentSedeId=null;$scope.currentCarreraId =null;
    $scope.currentCategoria='Categoría';
    $scope.currentSede='Sede';
    $scope.currentCarrera='Carrera';
    //Get Categorias
    var url=globarVar.url;
    $http.get(url+'getCategorias').
    success(function(data,status){
      listCategorias=data.categoria_proyecto;
      $scope.listCategorias=data.categoria_proyecto;
    }).
    error(function(data,status){
      console.log('error obteniendo Categorias del Servidor');
    });

    //get Sedes
    $http.get(url+'getSedes').
    success(function(data,status){
      listSedes=data.sede;
      $scope.listSedes=data.sede;
    }).
    error(function(data,status){
      console.log('error obteniendo Sedes del Servidor');
    });
    // acomodar botones y funciones
    $scope.participantes=[];
    $scope.agregando=false;
    $scope.icon='<span class="glyphicon glyphicon-plus"></span>';

    //ng clicks
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
  		$scope.participantes.push(angular.copy(participante));
    	$scope.agregando=false;
    	$scope.participante={};
    	$scope.icon='<span class="glyphicon glyphicon-plus"></span>';
    };
    $scope.finalizar=function(){
      url=globarVar.url;
      var urlReg = url+'setProyecto';
      if($scope.currentCategoriaId!==null && $scope.participantes.length>0){
          var formData = {
          'nombre':$scope.proyecto.nombre,
          'descripcion':$scope.proyecto.descripcion,
          'motivacion':$scope.proyecto.motivacion,
          'ventajas':$scope.proyecto.ventajas,
          'categoria_fk':$scope.currentCategoriaId,
          'feria_fk':7,
          'otrosDetalles':''
        };
        $http.post(urlReg,formData).
        success(function(data,status){
          proyectoID=data.proyecto.id;
          urlReg = url+'agregarEstudiantesProyecto';
          console.log($scope.participantes);
          for(var i=0;i<$scope.participantes.length;i++){
            var formData = {
              'nombre':$scope.participantes[i].nombre,
              'apellido1':$scope.participantes[i].apellido1,
              'apellido2':$scope.participantes[i].apellido2,
              'carnet':$scope.participantes[i].carnet,
              'email':$scope.participantes[i].email,
              'telefono':$scope.participantes[i].telefono,
              'carrera_fk':$scope.participantes[i].carrera_fk,
              'sede_fk':$scope.participantes[i].sede_fk,
              'proyecto_fk':proyectoID,
            };
            addPlayer(formData,urlReg,i);
          }
          alertService.newAlert('Se ha inscrito todo con exito',false);
          
        }).
        error(function(data,status){
          console.log(status);
        });
      }
      else{
        alert('Por favor complete todos los espacios');
      }

      
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

    var addPlayer=function(formData,urlReg,index){
      $http.post(urlReg,formData).
      success(function(data,status){
        console.log('Se ha inscrito todo con exito');
      }).
      error(function(data,status){
        console.log(status);
      });
    };

  });
