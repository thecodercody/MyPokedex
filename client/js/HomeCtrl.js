angular.module('pokeApp').controller('homeController', ['$scope', function($scope) {
  $scope.message = "Welcome to the Pokédex App!";
  $scope.question = "Please login below";
}]);