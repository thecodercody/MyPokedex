angular.module('pokeApp', ['ngRoute'])
  .controller('MainCtrl', ['$scope', function($scope){
    $.ajax({
    url: "http://pokeapi.co/api/v1/pokedex/1/",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      $scope.pokedex = data.pokemon;
      console.log($scope.pokedex);
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
    }
  });
}]);