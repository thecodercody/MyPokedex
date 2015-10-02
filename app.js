angular.module('pokeApp', ['ngRoute'])
  .factory('appFact', function appFactory(){
    return {};
  })
  .controller('MainCtrl', ['$scope', 'appFact', function($scope, appFact){
    $.ajax({
    url: "http://pokeapi.co/api/v1/pokedex/1/",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      $scope.pokedex = data.pokemon;
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
    }
  });
  $scope.pokemonDetails = function(poke){
    var uri = poke.resource_uri;
    $.ajax({
    url: 'http://pokeapi.co/' + uri,
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      appFact.pokemon = data;
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
    }
  });
  };
}]);



