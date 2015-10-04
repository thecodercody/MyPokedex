// modifying String prototype for first-letter capitalization
String.prototype.capFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

angular.module('pokeApp', ['ngRoute', 'ngAnimate'])
  
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
      setTimeout(function(){ 
        $('#' + poke.name).addClass('pokeballs-opening');
        $('#popupText').html(poke.name.capFirstLetter() + '<br><p>I choose YOU!</p>');
        $('.popup').css({ "opacity": "1", "margin-left": "45px", "margin-top": "-220px" });
        $('.stats').addClass('shine-me');
      }, 200);
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
          document.getElementById('spriteImages').src="";
          document.getElementById('rolling').src="../img/pokeballRolling.gif";
          setTimeout(function(){
            document.getElementById('rolling').src="";
            document.getElementById('spriteImages').src="../img/pokeballOpening.gif";
          }, 2000);  
          $('#spriteImages').removeClass('spriteImages-grow');
          setTimeout(function(){
            var path = 
              document.getElementById('spriteImages').src="../img/pokemon/" + appFact.pokemon.national_id + ".gif";
          }, 3500);
          setTimeout(function(){
            $('#spriteImages').addClass('spriteImages-grow');
          }, 4320);
          // paginate via national ID in the pokedex
          $('.ids').find('h2').text(appFact.pokemon.national_id);
        },
        error: function(data) {
          console.log('Error: Message not retrieved.');
        }
      });
    };
  }])

  .config(function($routeProvider, $locationProvider){
    $routeProvider

      // landing page
      .when('/', {
        templateUrl : '../pages/home.html',
        controller : 'homeController'
      })

      // details page
      .when('/details', {
        templateUrl : "../pages/details.html",
        controller : 'DetailsCtrl'
      })

      // about page
      .when('/about', {
        templateUrl : '../pages/about.html',
        controller : 'aboutController'
      })

      // contact info
      .when('/contact', {
        templateUrl : '../pages/contact.html',
        controller : 'contactController'
      })

      // all others
      .otherwise({redirectTo: '/details'});
      $locationProvider.html5Mode(true);
  })