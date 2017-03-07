angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'MainController'
        })
        .when('/orders', {
          templateUrl: 'views/orders.html',
          controller: 'OrderController'
        })
        .when('/new-order', {
          templateUrl: 'views/new-order.html',
          controller: 'OrderController'
        });

      $locationProvider.html5Mode(true);
  }]);
