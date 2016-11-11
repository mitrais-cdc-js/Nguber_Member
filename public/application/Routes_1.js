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
    
//    $stateProvider.state('RideRequest_Request', {
//      url: '/riderequest',
//      templateUrl: 'application/views/RideRequest/Request.html',
//      controller: 'RideRequestController',
//      onEnter: [
//        '$state',
//        'auth',
//        function ($state, auth) {
//          if (!auth.IsLoggedIn()) {
//            $state.go('LogIn');
//          }
//        }
//      ]
//    });
    
    $stateProvider.state('RideRequest_Detail', {
      url: '/riderequest/{id}',
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
        rideRequestDetail: [
          '$state',
          '$stateParams',
          'rideRequest',
          function ($state, $stateParams, rideRequest) {
            var detail = rideRequest.Get($stateParams.id);
            
//            switch (detail.rideRequest.status) {
//              case 0:
//                $state.go('RideRequest_Searching');
//                break;
//                
//              case 1:
//                $state.go('RideRequest_Waiting');
//                break;
//                
//              case 2:
//                $state.go('RideRequest_Enroute');
//                break;
//                
//              case 3:
//                $state.go('RideRequest_Complete');
//                break;
//            }
            
            return detail;
          }
        ]
      }
    });
    
    $stateProvider.state('RideRequest_Searching', {
      url: '/riderequest/{id}',
      templateUrl: 'application/views/RideRequest/Searching.html',
      controller: 'RideRequestController',
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
    
    $stateProvider.state('RideRequest_Waiting', {
      url: '/riderequest/{id}',
      templateUrl: 'application/views/RideRequest/Enroute.html',
      controller: 'RideRequestController',
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
    
    $stateProvider.state('RideRequest_Enroute', {
      url: '/riderequest/{id}',
      templateUrl: 'application/views/RideRequest/Enroute.html',
      controller: 'RideRequestController',
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
    
    $stateProvider.state('RideRequest_Complete', {
      url: '/riderequest/{id}',
      templateUrl: 'application/views/RideRequest/Enroute.html',
      controller: 'RideRequestController',
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
    
    
    // Withdrawol Controller
        
  
    // Default
    $urlRouterProvider.otherwise('login');
  }
]);