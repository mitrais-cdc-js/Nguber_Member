'use strict';

// Router Configs
NguberMember.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Account controller
    $stateProvider.state('Register', {
      url: '/register',
      templateUrl: 'application/views/Account/Register.html',
      controller: 'AccountController',
      onEnter: [
        '$state',
        'auth', 
        function ($state, auth) {
          if (auth.IsLoggedIn()) {
            $state.go('Home');
          }
        }
      ]
    });
    
    $stateProvider.state('LogIn', {
      url: '/login',
      templateUrl: 'application/views/Account/LogIn.html',
      controller: 'AccountController',
      onEnter: [
        '$state',
        'auth', 
        function ($state, auth) {
          if (auth.IsLoggedIn()) {
            $state.go('Home');
          }
        }
      ]
    });
    
    $stateProvider.state('LogOut', {
      url: '/logout',
      templateUrl: 'application/views/Account/LogOut.html',
      onEnter: [
        '$state',
        'auth', 
        function ($state, auth) {
          if (auth.IsLoggedIn()) {
            $state.go('Home');
          }
          else {
            $state.go('LogIn');
          }
        }
      ]
    });
    
    $stateProvider.state('ResetPassword', {
      url: '/resetpassword',
      templateUrl: 'application/views/Account/ResetPassword.html',
      controller: 'AccountController',
      onEnter: [
        '$state',
        'auth', 
        function ($state, auth) {
          if (auth.IsLoggedIn()) {
            $state.go('Home');
          }
        }
      ]
    });
    
    $stateProvider.state('ChangePassword', {
      url: '/changepassword', 
      templateUrl: 'application/views/Account/ChangePassword.html',
      controller: 'AccountController',
      onEnter: [
        '$state',
        'auth', 
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ]
    });
    
    
    // Home Controller
    $stateProvider.state('Home', {
      url: '/', 
      templateUrl: 'application/views/Home/Index.html',
      controller: 'HomeController',
      onEnter: [
        '$state',
        'auth', 
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ]
    });
    
    
    // Profile Controller
    $stateProvider.state('UpdateProfile', {
      url: '/profile',
      templateUrl: 'application/views/Profile/Index.html',
      controller: 'ProfileController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ]
    });
    
    
    // RideRequest Controller
    $stateProvider.state('RideRequest_Estimate', {
      url: '/riderequest',
      templateUrl: 'application/views/RideRequest/Estimate.html',
      controller: 'RideRequest_EstimateController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ]
    });
    
    
    $stateProvider.state('RideRequest_Detail', {
      url: '/riderequest/{Id}',
      templateUrl: 'application/views/RideRequest/Detail.html',
      controller: 'RideRequestController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ],
      resolve: {
        r: [
          '$stateParams',
          'rideRequest',
          function ($stateParams, rideRequest) {
            return rideRequest.Get($stateParams.Id);
          }
        ]
      }
    });
    
    $stateProvider.state('RideRequest_Searching', {
      url: '/riderequest/{Id}',
      templateUrl: 'application/views/RideRequest/Searching.html',
      controller: 'RideRequest_SearchingController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ],
      resolve: {
        postPromise: [
          'cancelReason',
          function (cancelReason) {
            return cancelReason.GetAll();
          }
        ]
      }
    });
    
    $stateProvider.state('RideRequest_Waiting', {
      url: '/riderequest/{Id}',
      templateUrl: 'application/views/RideRequest/Waiting.html',
      controller: 'RideRequest_WaitingController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ],
      resolve: {
        cancelReasons: [
          'cancelReason',
          function (cancelReason) {
            return cancelReason.GetAll();
          }
        ]
      }
    });
    
    $stateProvider.state('RideRequest_Enroute', {
      url: '/riderequest/{Id}',
      templateUrl: 'application/views/RideRequest/Enroute.html',
      controller: 'RideRequest_EnrouteController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ]
    });
    
    $stateProvider.state('RideRequest_Arrived', {
      url: '/riderequest/{Id}',
      templateUrl: 'application/views/RideRequest/Arrived.html',
      controller: 'RideRequest_ArrivedController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ],
      resolve: {
        r: [
          '$stateParams',
          'rideRequest',
          function ($stateParams, rideRequest) {
            return rideRequest.Get($stateParams.Id);
          }
        ]
      }
    });
    
    // RideHistory Controller
    $stateProvider.state('RideHistory', {
      url: '/ridehistory',
      templateUrl: 'application/views/RideHistory/Index.html',
      controller: 'RideHistoryController',
      onEnter: [
        '$state',
        'auth',
        function ($state, auth) {
          if (!auth.IsLoggedIn()) {
            $state.go('LogIn');
          }
        }
      ],
      resolve: {
        postPromise: [
          'rideRequest',
          function (rideRequest) {
            return rideRequest.GetHistory();
          }
        ]
      }
    });
    
    
    // TopUp Controller
    
    
    // Withdrawal Controller
        
  
    // Default
    $urlRouterProvider.otherwise('login');
  }
]);