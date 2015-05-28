'use strict';
/*jshint unused: false, undef:false */

/**
 * @ngdoc function
 * @name feriaNegociosTecApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the feriaNegociosTecApp
 */
angular.module('feriaNegociosTecApp')
  .controller('MainCtrl', function ($scope,$window,$location,$http,Logged,alertService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var url=globarVar.url;
    $scope.option={'Admin':false};
    $scope.logIn = function(){
      if($scope.option.Admin){
        console.log('1');
        $http.post(url+'admiLogIn',{usuario:$scope.admin.usuario, password:$scope.admin.password}).
          success(function(data,status){
            if((data.status!=='false')&&(data.status!=='Usuario equivocado')){
              alertService.newAlert('Bienvenido',false); 
              Logged.isLogged=true;
              Logged.isJudge=false;
              localStorage.setItem('Key',data.status);

              console.log(data.status);
              $location.path('/admin/proyectos');
            }
            else{
              alertService.newAlert('Credenciales Incorrectas',true);
            }
          }).
          error(function(data,status){
            alertService.newAlert('error en el procedimiento',true);
          });
      }
      else{
        console.log('2');
        $http.post(url+'juezLogIn',{usuario:$scope.admin.usuario, password:$scope.admin.password}).
          success(function(data,status){
            if((data.status!=='false')&&(data.status!=='Usuario equivocado')){
              alertService.newAlert('Bienvenido',false); 
              Logged.isLogged=true;
              Logged.isJudge=true;
              localStorage.setItem('Key',data.status.token);
              localStorage.setItem('JuezId',data.status.id);

              console.log(data.status.token);
              $location.path('/juez/proyectos');
            }
            else{
              alertService.newAlert('Credenciales Incorrectas',true);
            }
          }).
          error(function(data,status){
            alertService.newAlert('error en el procedimiento',true);
          });

      }


    };

  });
