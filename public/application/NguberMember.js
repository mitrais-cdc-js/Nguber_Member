'use strict';

// Declare app level model which depend on views, and components
var NguberMember = angular.module('NguberMember', [
  'ui.router',
  'nemLogging'
]);

NguberMember.run(function ($rootScope) {
  $rootScope.currentUser = {
    IsLoggedIn: false,
    Profile: {
    }
  };
  
  $rootScope.checkSearchingTimer = null;
  $rootScope.checkWaitingTimer = null;
  $rootScope.checkEnrouteTimer = null;
});




// Custom Filter
NguberMember.filter('durationFilter', function () {
  return function (input) {
    return Math.ceil(input / 60);
  };
});


// Interceptor
//$httpProvider.interceptors.push([
//  '$q', 
//  '$location',
//  '$window', 
//  function ($q, $location, $window) {
//    return {
//      'request': function (config) {
//        config.headers = config.headers || {};
//        if ($window.localStorage['NguberMember-Token']) {
//          config.headers.Authorization = 'Bearer ' + $window.localStorage['NguberMember-Token'];
//        }
//        return config;
//      },
//      'responseError': function (response) {
//        if (401 === response.status || 403 === response.status) {
//          $location.path('/login');
//        }
//        return $q.reject(response);
//      }
//    };
//  }
//]);


// Directives
//NguberMember.directive('showTab', 
//  function () {
//    return {
//      link: function (scope, element, attrs) {
//        element.click(function (e) {
//          e.preventDefault();
//          $(element).tab('show');
//        });
//      }
//    };
//  }
//);