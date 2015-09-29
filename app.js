angular.module('pokeApp', [])
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.pokemon = [];
    $.ajax({
    url: "http://pokeapi.co/api/v1/pokedex/1/",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      var pokedex = data;
      $scope.pokemons = pokedex.pokemon;
      _.each($scope.pokemons, function(pokemon){
        $scope.pokemon.push(pokemon.name);
        $(document.body).append('<p>' + pokemon.name + '</p>');
      });
      console.log($scope.pokemon);
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
    }
  });
}]);