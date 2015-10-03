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
    $('#' + poke.name).addClass('pokeballs-opening');
    $('#popupText').html(poke.name + '<br><p>I choose YOU!</p>');
    $('.popup').css({ "opacity": "1", "margin-left": "45px", "margin-top": "-220px" });
    setInterval(function(){
      $('#' + poke.name).removeClass('pokeballs-opening');
    }, 1150);
    setInterval(function(){
      $('.popup').css({ opacity: 0 });
    }, 4000);

    
    console.log('#' + poke.name);

    var uri = poke.resource_uri;
    $.ajax({
    url: 'http://pokeapi.co/' + uri,
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      appFact.pokemon = data;
      $('.ids').find('h2').text(appFact.pokemon.national_id);
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
    }
    });

  };
}]);



