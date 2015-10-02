angular.module('pokeApp').controller('DetailsCtrl', ['$scope', 'appFact', function($scope, appFact) {
  var setAttr = function() {
    if(appFact.pokemon){
      $scope.attack = appFact.pokemon.attack;
      console.log('if');
    }
    console.log($scope.attack);
  };


  setInterval(setAttr, 500);

}]);