'use strict';

NguberMember.controller('RideRequestController', [
  '$scope',
  '$state',
  '$stateParams',
  'r',
  function ($scope, $state, $stateParams, r) {
    var map = null;
    var pickUpMarker = null;
    var destinationMarker = null;
    $scope.RideRequest = {};
    
    switch (r.data.data.status) {
      case 0:
        $state.go('RideRequest_Searching', {
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
        
      case 3:
        $state.go('RideRequest_Arrived', {
          Id: $stateParams.Id
        });
        break;
        
      default:
        angular.copy(r.data.data, $scope.RideRequest);
    }
    
       
    $(function () {
      $('.rating').rating();
      
      var geo = r.data.data.pickUpGeo.split(' ');
      var geoCode = new google.maps.LatLng(Number(geo[1]), Number(geo[0]));
               
      map = new google.maps.Map(document.getElementById('map'), {
        center: geoCode,
        zoom: 16
      });      
      
      pickUpMarker = new google.maps.Marker({
        map: map,
        title: 'Pick Up',
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: geoCode
      });
      
      geo = r.data.data.destinationGeo.split(' ');
      geoCode = new google.maps.LatLng(Number(geo[1]), Number(geo[0]));
      destinationMarker = new google.maps.Marker({
        map: map,
        title: 'Destination',
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        position: geoCode
      });
    });
  }
]);