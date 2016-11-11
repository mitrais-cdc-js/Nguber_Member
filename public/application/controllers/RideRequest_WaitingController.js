// TODO : Update Member location periodically

'use strict';

NguberMember.controller('RideRequest_WaitingController', [
  '$rootScope',
  '$scope',
  '$state',
  '$stateParams',
  '$interval',  
  'rideRequest',
  'cancelReason',
  function ($rootScope, $scope, $state, $stateParams, $interval, rideRequest, cancelReason) {
    var map = null;
    var crosshairMarker = null;
    var pickUpMarker = null;
    var destinationMarker = null;
    var driverMarker = null;
    $scope.RideRequest = {};
    
    $scope.CancelReasons = cancelReason.cancelReasons;
    $scope.Cancel = {
      CancelReason: cancelReason.cancelReasons[0].id
    };    
    $scope.filterWaiting = function (value) {
      return (1 === value.onStatus);
    };
    
    var checkState = function () {
      rideRequest.Get($stateParams.Id)
      .error(function (error) {        
      })    
      .success(function (Data) {
        angular.copy(Data.data, $scope.RideRequest);
    
        var geo = Data.data.pickUpGeo.split(' ');
        if (null === pickUpMarker) {
          pickUpMarker = new google.maps.Marker({
            map: map,
            title: 'Pick Up',
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: new google.maps.LatLng(Number(geo[1]), Number(geo[0]))
          });
        }
        else {
          pickUpMarker.setPosition(new google.maps.LatLng(Number(geo[1]), Number(geo[0])));
          pickUpMarker.setMap(map);
        }
        
        geo = Data.data.destinationGeo.split(' ');
        if (null === destinationMarker) {
          destinationMarker = new google.maps.Marker({
            map: map,
            title: 'Destination',
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: new google.maps.LatLng(Number(geo[1]), Number(geo[0]))
          });
        }
        else {
          destinationMarker.setPosition(new google.maps.LatLng(Number(geo[1]), Number(geo[0])));
          destinationMarker.setMap(map);        
        }
        
        geo = Data.data.driver.geoLocation.split(' ');
        if (null === driverMarker) {
          driverMarker = new google.maps.Marker({
            map: map,
            title: 'Driver',
            icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            position: new google.maps.LatLng(Number(geo[1]), Number(geo[0]))
          });
        }
        else {
          driverMarker.setPosition(new google.maps.LatLng(Number(geo[1]), Number(geo[0])));
          driverMarker.setMap(map);
        }
    
        switch (Data.data.status) {
          case 0:
            $state.go('RideRequest_Seaching', { 
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
    $rootScope.checkWaitingTimer = $interval(function () {
      checkState();                
    },
    5000);
    
    
    $scope.$on('$destroy', function() {
      if (angular.isDefined($rootScope.checkWaitingTimer)) {
        $interval.cancel($rootScope.checkWaitingTimer);
        $rootScope.checkWaitingTimer = null;
      }
    });
    
    
    $(function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geoCode = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         
          map = new google.maps.Map(document.getElementById('map'), {
            center: geoCode,
            zoom: 16
          });      
          
          crosshairMarker = new google.maps.Marker({
            map: map,
            position: geoCode
          });          
        }, function() {
          //handleLocationError(true, infoWindow, map.getCenter());
          alert('error pos');
        });
      } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
        alert('not supported');
      }
    });
  }
]);