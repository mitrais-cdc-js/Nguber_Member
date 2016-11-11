'use strict';

NguberMember.controller('MainController', [
  '$rootScope',
  '$scope',
  '$state',
  'auth',
  function ($rootScope, $scope, $state, auth) {
    if (auth.IsLoggedIn()) {
      auth.CurrentUser();
    };    
    
    $scope.LogOut = function () {
      auth.LogOut();
      $rootScope.currentUser.IsLoggedIn = auth.IsLoggedIn();
      $state.go('LogOut');
    };
  }
]);