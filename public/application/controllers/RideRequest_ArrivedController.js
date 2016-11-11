'use strict';

NguberMember.controller('RideRequest_ArrivedController', [
  '$rootScope',
  '$scope',
  '$state',
  '$stateParams',
  'rideRequest',
  'r',
  function ($rootScope, $scope, $state, $stateParams, rideRequest, r) {
    $scope.Feedback = {
      Id: r.data.data.id,
      Rating: 5,
      Comment: 'Awesome :D, thanks!!!'
    };
    
    switch (r.data.data.status) {
      case 0:
        $state.go('RideRequest_Seaching', { 
          Id: $stateParams.Id  
        });
        break;

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

      case 4:
      case 5:
        $state.go('RideRequest_Detail', { 
          Id: $stateParams.Id 
        });
        break;

      default:
    }
    
    $scope.SendFeedback = function () {
      rideRequest.Completed({ 
        Id: $scope.Feedback.Id,
        Rating: $scope.Feedback.Rating * 2,
        Comment: $scope.Feedback.Comment
      })
      .error(function (Error) {
        var modelState = {};
        if (Error.errors) {
          Error.errors.forEach(function (item) {
            switch (item.source) {
              default:
                modelState[item.source] = item.message;
            }
          });
        }
        
        $scope.Error = Error;
        $scope.ModelState = modelState;
      })
      .then(function (Data) {
        $state.go('RideRequest_Detail', {
          Id: Data.data.data.id
        });
      });
    };    
  }
]);