

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
    url: "https://pokeapi.co/api/v1/pokedex/1/",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      $scope.pokedex = data.pokemon;
      _.each($scope.pokedex, function(poke){
        poke.name = poke.name.capFirstLetter();
      })
    },
    error: function(data) {
      console.log('Error: Could not capitalize!');
     }
    });

    // when pokeballs are clicked, call function below
    $scope.pokemonDetails = function(poke){
    console.log("poke: " + Object.keys(poke));

    // animations entering
      setTimeout(function(){ 
        $('#' + poke.name).addClass('pokeballs-opening');
        $('#rolling').attr('src', 'client/img/pokeballRolling.gif');
        $('#popupText').html(poke.name.capFirstLetter() + '<br><p>I choose YOU!</p>');
        $('.popup').css({ "opacity": "1", "margin-left": "45px", "margin-top": "-220px" });
        $('.stats').addClass('shine-me');
      }, 200);
      $('#pokeballSounds').html('<audio autoplay=""><source src="client/sounds/pokeballOpen.mp3" type="audio/mpeg"></source></audio>');
      $('#iChooseYou').html('<audio autoplay=""><source src="client/sounds/iChooseYou.mp3" type="audio/mpeg"></source></audio>');
      
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

      setTimeout(function(){
        $('#iChooseYou').html('');
      }, 1700);

      // get individual pokemon data
      var uri = poke.resource_uri;

      uri = uri.split('/');
      uri = uri[uri.length - 2];

      $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + uri + "/",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      $scope = data;
      console.log($scope);
      appFact.name = $scope.name;
      appFact.name = appFact.name.capFirstLetter();
      appFact.attack = $scope.stats[4].base_stat;
      appFact.defense = $scope.stats[3].base_stat;
      console.log(appFact);
    },
    error: function(data) {
      console.log(data);
      console.log('Error: Could not get individual Pokémon data!');
     }
    });

      console.log('uri: ' +  uri);
      
          $('#spriteImages').attr('src', '');
          $('#rolling').attr('src', 'client/img/pokeballRolling.gif');
          setTimeout(function(){
            document.getElementById('rolling').src="";
            document.getElementById('spriteImages').src="client/img/pokeballOpening.gif";
          }, 2000);  
          $('#spriteImages').removeClass('spriteImages-grow');
          setTimeout(function(){
              appFact = poke;
              document.getElementById('spriteImages').src="client/img/pokemon/" + uri + ".gif";
              $('#spriteImages').addClass('spriteImages-grow');
          }, 3500);
          // paginate via national ID in the pokedex
          $('.ids').find('h2').text(uri);
    
    };
  }])

  .config(function($routeProvider, $locationProvider){
    $routeProvider

      // landing page
      .when('/', {
        templateUrl : 'client/pages/home.html',
        controller : 'homeController'
      })

      // details page
      .when('/details', {
        templateUrl : "client/pages/details.html",
        controller : 'detailsController'
      })

      // about page
      .when('/about', {
        templateUrl : 'client/pages/about.html',
        controller : 'aboutController'
      })

      // contact info
      .when('/contact', {
        templateUrl : 'client/pages/contact.html',
        controller : 'contactController'
      })

      // all others
      .otherwise({redirectTo: '/details'});
      $locationProvider.html5Mode(true);
  })