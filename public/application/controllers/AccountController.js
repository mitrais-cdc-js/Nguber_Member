'use strict';

NguberMember.controller('AccountController', [
  '$scope',
  '$state',
  'auth',
  function ($scope, $state, auth) {
    
    $scope.Register = function () {
      auth.Register($scope.User)
      .error(function (Error) {
        var modelState = {};    
        if (Error.errors) {
          Error.errors.forEach(function (item) {
            switch (item.source) {
              case 'PasswordRequiresNonAlphanumeric':   
              case 'PasswordRequiresLower':
              case 'PasswordRequiresUpper':
                modelState['PasswordPolicy'] = 'Password must have at least one non alphanumeric character, one lowercase and one uppercase';
                break;
              
              default:
                modelState[item.source] = item.message;
            }            
          });
        }
        
        $scope.error = Error;
        $scope.modelState = modelState;
      })
      .then(function (){
        auth.LogIn({
          UserName: $scope.User.Email, 
          Password: $scope.User.Password
        })
        .error(function (error) {
          $state.go('LogIn');
        })
        .then(function () {
          $state.go('Home');
        });        
      });      
    };
        
    $scope.LogIn = function () {
      auth.LogIn($scope.User)
      .error(function (error) {
        var modelState = {};
        if (error.errors) {
          var modelState = {};
          error.errors.forEach(function (item) {
            modelState[item.source] = item.message;
          });
        }
        
        $scope.error = error;
        $scope.modelState = modelState;
      })
      .then(function () {
        $state.go('Home');
      });
    };  
    

    $scope.ChangePassword = function () {
      alert('change');
    };
    
    
    $scope.ResetPassword = function () {
      alert('reset');
    };
  }
]);