'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:EditarCtrl
 * @description
 * # EditarCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('EditarCtrl', function ($scope,categoriaService,sedesService,carrerasService,preguntasService,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var key=localStorage.getItem('Key');
    var currentCategoria=null;
    var currentSede=null;
    var currentSedeXCarrera=null;
    var currentCarrera=null;
    var currentPregunta=null;
    var currentCarreraElim=null;


    $scope.categoria='Categoría';
    $scope.sedes='Sede';
    $scope.sedexcarrera='Sede';
    $scope.carreras='Carrera';
    $scope.etapa='Etapa';
    $scope.preguntas='Pregunta';
    $scope.carrerasElim='Carrera';

    categoriaService.getCategorias(function(data){
    	$scope.listCategorias=data.categoria_proyecto;
    });
    sedesService.getSedes(key,function(data){
    	$scope.listSedes=data.sede;
    });
    carrerasService.getCarreras(key,function(data){
    	$scope.listCarreras=data.carrera;
    });
    preguntasService.getPreguntas(key,1,function(data){
    	$scope.listPreguntas=data.tipo_calificacion;
    });
    preguntasService.getPreguntas(key,2,function(data){
    	$scope.listPreguntasEt2=data.tipo_calificacion;
    });

	$scope.crearCategoria = function(){
	    categoriaService.crearCategoria($scope.categorias,key,function(){
	    	alertService.newAlert('Se ha creado la categoria con éxito',false);
	    	categoriaService.getCategorias(function(data){
		    	$scope.listCategorias=data.categoria_proyecto;
		    });
	    });
	};
	$scope.cCategoria=function(id,nombre){
		$scope.categoria=nombre;
		currentCategoria=id;
	};
	$scope.eliminarCategoria=function(){
		categoriaService.eliminarCategoria(currentCategoria,key,function(){
	    	alertService.newAlert('Se ha eliminado la categoria con éxito',false);
	    	categoriaService.getCategorias(function(data){
		    	$scope.listCategorias=data.categoria_proyecto;
		    });
	    });
	};

	$scope.crearSede = function(){
	    sedesService.setSede($scope.sede,key,function(){
	    	alertService.newAlert('Se ha creado la sede con éxito',false);
	    	sedesService.getSedes(key,function(data){
		    	$scope.listSedes=data.sede;
		    });
	    });
	};
	$scope.cSede = function(id,nombre){
		$scope.sedes=nombre;
		currentSede=id;
	};
	$scope.eliminarSede = function(){
		sedesService.deleteSede(currentSede,key,function(){
			alertService.newAlert('Se ha eliminado la sede con éxito',false);
	    	sedesService.getSedes(key,function(data){
		    	$scope.listSedes=data.sede;
		    });
		});
	};

	$scope.crearCarrera = function(){
	    carrerasService.setCarrera($scope.carrera,key,function(){
	    	alertService.newAlert('Se ha creado la carrera con éxito',false);
	    	carrerasService.getCarreras(key,function(data){
    		$scope.listCarreras=data.carrera;
    		});
	    });	
	};
	$scope.cSedeXCarrera = function(id,nombre){
		$scope.sedexcarrera=nombre;
		currentSedeXCarrera=id;
	};
	$scope.cCarrera = function(id,nombre){
		$scope.carreras=nombre;
		currentCarrera=id;
	};

	$scope.asignarCarrera=function(){
		carrerasService.setSedeXCarrera(currentSedeXCarrera,currentCarrera,key,function(){
	    	alertService.newAlert('Se ha asignado la carrera con éxito',false);
		});
	};

	$scope.cEtapa = function(numero){
		$scope.etapa=numero;
	};

	$scope.agregarPregunta=function(){
		preguntasService.setPregunta($scope.pregunta.nombre,$scope.pregunta.valor,$scope.pregunta.descripcion,$scope.etapa,key,function(){
			alertService.newAlert('Se ha creado la pregunta con éxito',false);
		});
	};

	$scope.cPregunta=function(id,nombre){
		$scope.preguntas=nombre;
		currentPregunta=id;
	};

	$scope.eliminarPregunta=function(){
		preguntasService.deletePregunta(currentPregunta,key,function(){
			alertService.newAlert('Se ha eliminado la pregunta con éxito',false);
			    preguntasService.getPreguntas(key,1,function(data){
			    	$scope.listPreguntas=data.tipo_calificacion;
			    });
			    preguntasService.getPreguntas(key,2,function(data){
			    	$scope.listPreguntasEt2=data.tipo_calificacion;
    			});
		});
	};

	$scope.cCarreraElim=function(id,nombre){
		$scope.carrerasElim=nombre;
		currentCarreraElim=id;
	};

	$scope.eliminarCarrera=function(){
		carrerasService.deleteCarrera(currentCarreraElim,key,function(){
			alertService.newAlert('Se ha eliminado la carrera con éxito',false);
		});
	};


  });


