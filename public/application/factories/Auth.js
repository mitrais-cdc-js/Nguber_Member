'use strict';

NguberMember.factory('auth', [
  '$http',
  '$window',
  '$rootScope', 
  function ($http, $window, $rootScope) {
    var auth = {};
    
    auth.SaveToken = function (Token) {      
      $window.localStorage['NguberMember-Token'] = Token;      
      auth.CurrentUser();
    };
    
    auth.GetToken = function () {
      return $window.localStorage['NguberMember-Token'];
    };
    
    auth.IsLoggedIn = function () {
      var token = auth.GetToken();
      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        if (payload.exp > (Date.now() / 1000)) 
          return true;
        else {
          auth.LogOut();
          return false;
        }
      }
      else {
        return false;
      };
    };
    

    auth.CurrentUser = function() {
      if (auth.IsLoggedIn()) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + auth.GetToken();
        return $http.get('http://localhost:59188/api/members').success(function (Data) {
          $rootScope.currentUser.IsLoggedIn = true;
          $rootScope.currentUser.Profile = Data.data;
        });
      }
    };
        
    
    auth.Register = function (User) {
      return $http.post('http://localhost:59188/api/members', User)
      .success(function () {
      });
    };
    
    auth.LogIn = function (User) {
      return $http.post('http://localhost:59188/api/token', User).success(function (Data) {
        auth.SaveToken(Data.data.AccessToken);
      });
    };
    
    
    auth.LogOut = function () {
      $http.defaults.headers.common.Authorization = '';
      delete $window.localStorage['NguberMember-Token'];      
    };
    
    return auth;
  }
]);