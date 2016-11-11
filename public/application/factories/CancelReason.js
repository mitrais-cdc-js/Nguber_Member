'use strict';

NguberMember.factory('cancelReason', [
  '$http',
  '$state',
  'auth',
  function ($http, $state, auth) {
    var model = {
      cancelReasons: []
    };
    
    model.GetAll = function () {
      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();
      return $http.get('http://localhost:59188/api/members/GetCancelReasons')
      .success(function (Data) {
        angular.copy(Data.data, model.cancelReasons);
      });
    };
    
    return model;
  }
]);
