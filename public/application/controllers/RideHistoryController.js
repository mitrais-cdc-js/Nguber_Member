'use strict';

NguberMember.controller('RideHistoryController', [
  '$scope',
  'rideRequest',
  function ($scope, rideRequest) {
    $scope.rideRequests = rideRequest.rideRequests;
    $scope.rideRequest = rideRequest.rideRequest;
    
    
    $scope.filterActive = function (value) {
      return (4 > value.status);
    };
    
    
    $scope.filterNonActive = function (value) {
      return (4 <= value.status);
    };
         
                  
    $(function() {
      $('.rating').rating({        
      });
    });
  }
]);