angular.module('pokeApp').controller('homeController', ['$scope', function($scope) {
  $scope.message = "Welcome to the Pokedex App!";
  $scope.question = "Please login below";
}]);