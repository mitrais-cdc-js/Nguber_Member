// TODO : Update member location periodically

'use strict';

NguberMember.controller('RideRequest_SearchingController', [
  '$rootScope',
  '$scope',
  '$state',
  '$stateParams',
  '$interval',  
  'rideRequest',
  'cancelReason',
  function ($rootScope, $scope, $state, $stateParams, $interval, rideRequest, cancelReason) {
    $scope.CancelReasons = cancelReason.cancelReasons;
    $scope.Cancel = {
      CancelReason: cancelReason.cancelReasons[0].id
    };
    
    $scope.filterSearching = function (value) {
      return (0 === value.onStatus);
    };
    
    var checkState = function () {
      rideRequest.Get($stateParams.Id)
      .error(function (error) {      
      })    
      .success(function (Data) {
        switch (Data.data.status) {
          case 1:
            $state.go('RideRequest_Waiting', { 
              Id: $stateParams.Id 
            });
            break;
            
          case 2:
            $state.go('RideRequest_Enroute', { 
              Id: $stateParams.Id 
            });
            break;
            
          case 3:
            $state.go('RideRequest_Arrived', { 
              Id: $stateParams.Id 
            });
            break;
            
          case 4:
          case 5:
            $state.go('RideRequest_Detail', { 
              Id: $stateParams.Id 
            });
            break;
            
          default:
        }       
      }); 
    };
    
    checkState();
    $rootScope.checkSearchingTimer = $interval(function () {
      checkState();                
    },
    5000);
    
    
    $scope.$on('$destroy', function() {
      if (angular.isDefined($rootScope.checkSearchingTimer)) {
        $interval.cancel($rootScope.checkSearchingTimer);
        $rootScope.checkSearchingTimer = null;
      }
    });
  }
]);