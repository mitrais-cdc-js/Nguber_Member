'use strict';

NguberMember.controller('HomeController', [
  '$scope',
  '$state',
  'auth',
  function ($scope, $state, auth) {
    
    $scope.LogOut = function () {
      auth.LogOut();
      $scope.currentUser.IsLoggedIn = auth.IsLoggedIn();
      $state.go('LogOut');
    };
  }
]);