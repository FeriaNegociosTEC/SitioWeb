'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc overview
 * @name feriaNegociosTecApp
 * @description
 * # feriaNegociosTecApp
 *
 * Main module of the application.
 */

//Variables Globales
//===========================================================
//
//
//
var listCategorias=[];
var listSedes=[];
var listetapas=[
{'nombre':1},{'nombre':2},{'nombre':'Todas'}];
var listProyectos=[];
var listJueces=[];
var listCarreras=[];

//===========================================================
var globarVar = {
  currentProyecto: null,
  currentJuez: null,
  logged  : false,
  url: 'https://gentle-scrubland-4147.herokuapp.com/',
};

var customAlert={
  text:'Some content',
  active:false,
  errorActive:false,
  errorText:'errors'
};

var app=angular.module('feriaNegociosTecApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-parallax',
    'ngSanitize',
    'ngCsv'
  ]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);

app.config(function ($routeProvider) {
    $routeProvider
    //proyectos
      .when('/', {
        templateUrl: 'views/crearProyecto.html',
        controller: 'CrearProyectoCtrl'
      })
      .when('/login', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      /// Juez
      .when('/juez/proyectos', {
        templateUrl: 'views/juezProyectos.html',
        controller: 'JuezProyectosCtrl'
      })
      .when('/juez/proyectos/juzgar', {
        templateUrl: 'views/juezJuzgar.html',
        controller: 'JuezJuzgarCtrl'
      })
      .when('/juez/formularios', {
        templateUrl: 'views/juezFormulario.html',
        controller: 'JuezFormularioCtrl'
      })
      /// admin
      .when('/admin/proyectos', {
        templateUrl: 'views/proyectos.html',
        controller: 'ProyectosCtrl'
      })
      .when('/admin/proyectos/editar', {
        templateUrl: 'views/editarProyecto.html',
        controller: 'EditarProyectoCtrl'
      })
      // Jueces
      .when('/admin/jueces', {
        templateUrl: 'views/jueces.html',
        controller: 'JuecesCtrl'
      })
      .when('/admin/jueces/crear', {
        templateUrl: 'views/crearJuez.html',
        controller: 'CrearJuezCtrl'
      })
      .when('/admin/jueces/editar', {
        templateUrl: 'views/editarJuez.html',
        controller: 'EditarJuezCtrl'
      })
      .when('/admin/jueces/asignarProyecto', {
        templateUrl: 'views/asignarProyecto.html',
        controller: 'AsignarProyectoCtrl'
      })

      //Etapas
      .when('/admin/etapas',{
        templateUrl: 'views/etapas.html',
        controller:'EtapasCtrl'
      })
      //Opciones
      .when('/admin/editar',{
        templateUrl: 'views/editar.html',
        controller:'EditarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.factory('alertService', function() {
        return {
            newAlert: function(text,isError) {
              if(!isError){
                customAlert.text=text;
                customAlert.active=true;
              }
              else{
                customAlert.errorText=text;
                customAlert.errorActive=true;
              }
            }
        };
    });

app.value('Logged',{
  isLogged : false,
  isJudge : false,
});

app.value('thisProyecto',{
  proyecto: null,
});


//controller de la barra de navegacion
app.controller('NavCtrl', function ($scope,$window,$location,Logged) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isLogged=function(){
      return Logged.isLogged;
    };

    $scope.isLoggedJudge=function(){
      return Logged.isJudge;
    };

    $scope.isAdmin=function(){
      return $location.path()!==('/');
    };

    $scope.logOut=function(){
      localStorage.removeItem('Key');
      localStorage.removeItem('JuezId');
      Logged.isLogged=false;
      Logged.isJudge=false;
    };

  });

app.controller('ctrlRead', function ($scope) {
    $scope.successTextAlert =function(){
      return customAlert.text;};
    $scope.showSuccessAlert=function(){
      return customAlert.active;};
    $scope.showDangerAlert=function(){
      return customAlert.errorActive;
    };
    $scope.dangerTextAlert=function(){
      return customAlert.errorText;
    };
    $scope.switchBoolDanger= function () {
        customAlert.errorActive=false;
    };
    $scope.switchBool = function () {
        customAlert.active=false;
    };
});

app.factory('categoriaService', ['$http', function($http){
    var getCategorias = {
     method: 'GET',
     url: 'https://gentle-scrubland-4147.herokuapp.com/getCategorias',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var setCategoria = {
     method: 'POST',
     url: 'https://gentle-scrubland-4147.herokuapp.com/setCategoria',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var deleteCategoria = {
     method: 'DELETE',
     url: 'https://gentle-scrubland-4147.herokuapp.com/deleteCategoria',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    return{
      getCategorias: function(callback){
          $http(getCategorias).success(function(data) {
          callback(data);
        });
      },
      crearCategoria:function(nombre,token,callback){
        setCategoria.data={'nombre':nombre,'token':token};
        $http(setCategoria).success(function(data){
          callback(data);
        });
      },
      eliminarCategoria:function(id,token,callback){
        deleteCategoria.params={'id':id,'token':token};
        $http(deleteCategoria).success(function(data){
          callback(data);
        }); 
      }
    };
  }]);

app.factory('preguntasService', ['$http', function($http){
    var getPreguntas = {
     method: 'GET',
     url: 'https://gentle-scrubland-4147.herokuapp.com/mostrarPreguntas',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var calificar = {
     method: 'POST',
     url: 'https://gentle-scrubland-4147.herokuapp.com/calificar',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var setPregunta = {
     method: 'POST',
     url: 'https://gentle-scrubland-4147.herokuapp.com/agregarPregunta',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var deletePregunta = {
     method: 'DELETE',
     url: 'https://gentle-scrubland-4147.herokuapp.com/eliminarPregunta',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    return{
      getPreguntas: function(token,fase,callback){
          getPreguntas.params={'token':token,'fase':fase};
          $http(getPreguntas).success(function(data) {
          callback(data);
        });
      },
      responderPreguntas: function(juez,proyecto,tipo_calificacion,nota,token,callback){
        calificar.data={'juez_fk':juez,'proyecto_fk':proyecto,'tipo_calificacion_fk':tipo_calificacion,'nota':nota,'token':token};
        $http(calificar).success(function(data) {
          callback(data);
        });
      },
      setPregunta:function(nombre,valor,descripcion,fase,token,callback){
        setPregunta.data={'nombre':nombre,'valor':valor,'descripcion':descripcion,'fase':fase,'token':token};
        $http(setPregunta).success(function(data){
          callback(data);
        });
      },
      deletePregunta: function(id,token,callback){
          deletePregunta.params={'token':token,'id':id};
          $http(deletePregunta).success(function(data) {
          callback(data);
        });
      },
    };
  }]);
app.factory('sedesService', ['$http', function($http){
    var getSedes = {
     method: 'GET',
     url: 'https://gentle-scrubland-4147.herokuapp.com/getSedes',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var setSede = {
     method: 'POST',
     url: 'https://gentle-scrubland-4147.herokuapp.com/setSede',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var deleteSede = {
     method: 'DELETE',
     url: 'https://gentle-scrubland-4147.herokuapp.com/deleteSede',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    return{
      getSedes: function(token,callback){
          getSedes.params={'token':token};
          $http(getSedes).success(function(data) {
          callback(data);
        });
      },
      setSede: function(nombre,token,callback){
        setSede.data={'nombre':nombre,'token':token};
        $http(setSede).success(function(data) {
          callback(data);
        });
      },
      deleteSede: function(id,token,callback){
        deleteSede.params={'id':id,'token':token};
        $http(deleteSede).success(function(data) {
          callback(data);
        });
      }
    };
  }]);

app.factory('carrerasService', ['$http', function($http){
    var getCarreras = {
     method: 'GET',
     url: 'https://gentle-scrubland-4147.herokuapp.com/getCarreras',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var setCarrera = {
     method: 'POST',
     url: 'https://gentle-scrubland-4147.herokuapp.com/setCarrera',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var setSedeXCarrera = {
     method: 'POST',
     url: 'https://gentle-scrubland-4147.herokuapp.com/setCarreraXSede',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    var deleteCarrera = {
     method: 'DELETE',
     url: 'https://gentle-scrubland-4147.herokuapp.com/deleteCarrera',
     headers: {
       'Content-Type': 'application/json',
     }
    };
    return{
      getCarreras: function(token,callback){
          getCarreras.params={'token':token};
          $http(getCarreras).success(function(data) {
          callback(data);
        });
      },
      setCarrera: function(nombre,token,callback){
        setCarrera.data={'nombre':nombre,'token':token};
        $http(setCarrera).success(function(data) {
          callback(data);
        });
      },
      setSedeXCarrera: function(sede,carrera,token,callback){
        setSedeXCarrera.data={'sede_fk':sede,'carrera_fk':carrera,'token':token};
        $http(setSedeXCarrera).success(function(data) {
          callback(data);
        });
      },
      deleteCarrera: function(id,token,callback){
        deleteCarrera.params={'id':id,'token':token};
        $http(deleteCarrera).success(function(data) {
          callback(data);
        });
      },
    };
  }]);



