angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    
    // home page
    .when('/', {
      templateUrl : 'views/home.html',
      controller : 'MainController'
    })

    // details page
    .when('/*', {
      templateUrl : 'views/details.html',
      controller : 'DetailsCtrl'
    });

  
  $locationProvider.html5Mode(true);
  
}]);