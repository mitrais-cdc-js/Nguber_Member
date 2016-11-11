'use strict';

NguberMember.factory('rideRequest', [
  '$http',
  '$state',
  'auth',  
  function ($http, $state, auth) {
    var model = {
      rideRequests: [],
      rideRequest: {},
      rideEstimate: {}
    };
    
    model.GetEstimate = function (Estimate) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();        
      return $http.post('http://localhost:59188/api/riderequests/Estimate', Estimate)
      .success(function (Data) {
        return Data.data.data;
      });
    };
    
    model.Request = function (Request) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();
      return $http.post('http://localhost:59188/api/riderequests/request', Request).success(function (Data) {
        return Data.data.data;
      });
    };
    
//    model.GetAll = function() {
//      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();        
//      return $http.get('http://localhost:59188/api/members/RideRequestHistory').success(function (Data) {
//        angular.copy(Data, model.rideRequests);
//      });
//    };

    model.Get = function (id) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();        
      return $http.get('http://localhost:59188/api/riderequests/' + id)
      .success(function (Data) {
//        switch (Data.data.status) {
//          case 0:
//            $state.go('RideRequest_Searching');
//            break;
//            
//          case 1:
//            $state.go('RideRequest_Waiting');
//            break;
//            
//          case 2:
//            $state.go('RideRequest_Enroute');
//            break;
//            
//          case 3:
//            $state.go('RideRequest_Complete');
//            break;
//            
//          case 4:
//            $state.go('RideRequest_Detail');
//            break;
//        }
        
        angular.copy(Data.data.data, model.rideRequest);
      });
    };
    
    
    model.Completed = function (Feedback) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();
      return $http.put('http://localhost:59188/api/riderequests/Completed', Feedback)
      .success(function () {
      });
    };
    
    
    model.GetHistory = function () {
      $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();        
      return $http.get('http://localhost:59188/api/members/RideRequestHistory')
      .success(function (Data) {
        angular.copy(Data.data, model.rideRequests);
      });
    };
    
    return model;
  }
]);