// modifying String prototype for first-letter capitalization
String.prototype.capFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

angular.module('pokeApp', ['ngRoute'])
  
  // making an app-wide persistent object to attach data to
  .factory('appFact', function appFactory(){
    return {};
  })

  // gather pokedex
  .controller('MainCtrl', ['$scope', 'appFact', function($scope, appFact){
    $.ajax({
    url: "http://pokeapi.co/api/v1/pokedex/1/",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      $scope.pokedex = data.pokemon;
      _.each($scope.pokedex, function(poke){
        poke.name = poke.name.capFirstLetter();
      })
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
     }
    });

  // when pokeballs are clicked, call function below
  $scope.pokemonDetails = function(poke){
    
    // animations entering
      $('#' + poke.name).addClass('pokeballs-opening');
      $('#popupText').html(poke.name.capFirstLetter() + '<br><p>I choose YOU!</p>');
      $('.popup').css({ "opacity": "1", "margin-left": "45px", "margin-top": "-220px" });
      $('.stats').addClass('shine-me');
      $('#pokeballSounds').html('<audio autoplay=""><source src="sounds/pokeballOpen.mp3" type="audio/mpeg"></source></audio>');
    
    // animations exit
      setTimeout(function(){
        $('#' + poke.name).removeClass('pokeballs-opening');
      }, 2150);
    
      setTimeout(function(){
        $('.popup').css({ opacity: 0 });
      }, 3000);

      setTimeout(function(){
        $('.stats').removeClass('shine-me');
        $('#pokeballSounds').html('');
      }, 500);
      
    // get individual pokemon data
    var uri = poke.resource_uri;
    $.ajax({
      url: 'http://pokeapi.co/' + uri,
      type: "GET",
      contentType: 'application/json',
      success: function (data) {
        appFact.pokemon = data;
        // paginate via national ID in the pokedex
        $('.ids').find('h2').text(appFact.pokemon.national_id);
      },
      error: function(data) {
        console.log('Error: Message not retrieved.');
      }
    });
  };
}]);