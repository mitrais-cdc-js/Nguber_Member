// TODO : Update Member location periodically

'use strict';

NguberMember.controller('RideRequest_EstimateController', [
  '$scope',
  '$state',
  'rideRequest',  
  function ($scope, $state, rideRequest) {
    //$scope.rideRequest = rideRequestDetail;
    // $scope.rideEstimate = rideEstimate;
    var map = null;
    var crosshairMarker = null;
    var pickUpMarker = null;
    var destinationMarker = null;
    $scope.SelectDestination = false;
    $scope.ShowGetEstimate = false;
    $scope.Estimate = {
      PickUp: '',
      PickUpLatitude: 0,
      PickUpLongitude: 0,
      Destination: '',
      DestinationLatitude: 0,
      DestinationLongitude: 0
    };
    $scope.RideEstimate = {
      Id: 0,
      PickUp: '',
      Destination: '',
      EstimatedDistance: 0,
      EstimatedDuration: 0,
      Discount: 0,
      Total: 0,
      PaymentMethod: 0
    };        
    
    
    $scope.GetEstimate = function () {
      rideRequest.GetEstimate($scope.Estimate)
      .error(function (error) {
        var modelState = {};
        if (error.errors) {
          error.errors.forEach(function (item) {
            switch (item.source) {
              default:
                modelState[item.source] = item.message;
            }
          });
        }

        $scope.Error = error;
        $scope.ModelState = modelState;
      })
      .success(function (Data) {
        $scope.RideEstimate.Id = Data.data.id;
        $scope.RideEstimate.PickUp = Data.data.pickUp;
        $scope.RideEstimate.Destination = Data.data.destination;
        $scope.RideEstimate.EstimatedDistance = Data.data.estimatedDistance;
        $scope.RideEstimate.EstimatedDuration = Data.data.estimatedDuration;
        $scope.RideEstimate.Discount = Data.data.discount;
        $scope.RideEstimate.Total = Data.data.total;
        $('#modal').modal('show');
      });      
    };
    
    
    $scope.Request = function () {
      rideRequest.Request({
        Id: $scope.RideEstimate.Id, 
        PaymentMethod: $scope.RideEstimate.PaymentMethod 
      })
      .error(function (error) {
        var modelState = {};
        if (error.errors) {
          error.errors.forEach(function (item) {
            switch (item.source) {
              default:
                modelState[item.source] = item.message;
            }
          });
        }
        
        $scope.Error = error;
        $scope.ModelState = modelState;
      })
      .success(function (Data) {
        $state.go('RideRequest_Searching', { 
          Id: Data.data.id 
        });
      });
    };
      
   
    $scope.SearchLocation = function () {
      var political = '';
      var country = '';
      var geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({
        location: map.getCenter()
      },
      function (results, status) {
        if ('OK' === status) {
          country = results[0].address_components['country'];
        }
      });
      
      geoCoder.geocode({
        address: ($scope.SelectDestination ? $scope.Estimate.Destination : $scope.Estimate.PickUp)
      },
      function (results, status) {
        if ('OK' === status) {
          var geoCode = results[0].geometry.location;
          map.setCenter(geoCode);
          if ($scope.SelectDestination) {
            $scope.Estimate.DestinationLatitude = geoCode.lat();
            $scope.Estimate.DestinationLongitude = geoCode.lng();
            $scope.Estimate.Destination = geoCode.lat() + ',' + geoCode.lng();
          }
          else {
            $scope.Estimate.PickUpLatitude = geoCode.lat();
            $scope.Estimate.PickUpLongitude = geoCode.lng();
            $scope.Estimate.PickUp = geoCode.lat() + ',' + geoCode.lng();
          }
        }
        else {
          alert('Cannot find inputed address (' + ($scope.SelectDestination ? $scope.Estimate.Destination : $scope.Estimate.PickUp) + ').');
        }
      });      
    };    
      
    
    $scope.GetCurrentLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geoCode = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(geoCode);
          $scope.Estimate.PickUpLatitude = geoCode.lat();
          $scope.Estimate.PickUpLongitude = geoCode.lng();
          $scope.Estimate.PickUp = geoCode.lat() + ',' + geoCode.lng();
        }, function() {
          //handleLocationError(true, infoWindow, map.getCenter());
          alert('error pos');
        });
      } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
        alert('not supported');
      }
    };
        
 
    $scope.SetPickUp = function () {
      $scope.SelectDestination = true;
      if (pickUpMarker) 
        pickUpMarker.setMap(null);
      pickUpMarker = new google.maps.Marker({
        map: map,
        title: 'Pick Up',
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: map.getCenter()
      });
    };
    
    
    $scope.SetDestination = function () {
      $scope.ShowGetEstimate = true;
      if (destinationMarker)
        destinationMarker.setMap(null);
      destinationMarker = new google.maps.Marker({
        map: map,
        title: 'Destination',
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        position: map.getCenter()
      });
    };
    
    
    $(function () {
      $('.rating').rating();
      $('.selectpicker').selectpicker({
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geoCode = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $scope.Estimate.PickUpLatitude = geoCode.lat();
          $scope.Estimate.PickUpLongitude = geoCode.lng();
          $scope.Estimate.PickUp = geoCode.lat() + ',' + geoCode.lng();
          
          map = new google.maps.Map(document.getElementById('map'), {
            center: geoCode,
            zoom: 16
          });      
          map.addListener('center_changed', function() {
            var newCenter = map.getCenter();
            $scope.$apply(function() {
              if ($scope.SelectDestination) {
                $scope.Estimate.DestinationLatitude = newCenter.lat();
                $scope.Estimate.DestinationLongitude = newCenter.lng();
                $scope.Estimate.Destination = newCenter.lat() + ',' + newCenter.lng();
              }
              else {
                $scope.Estimate.PickUpLatitude = newCenter.lat();
                $scope.Estimate.PickUpLongitude = newCenter.lng();
                $scope.Estimate.PickUp = newCenter.lat() + ',' + newCenter.lng();
              }              
            });
          });
          crosshairMarker = new google.maps.Marker({
            map: map
          });
          crosshairMarker.bindTo('position', map, 'center');
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