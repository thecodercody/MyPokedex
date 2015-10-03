angular.module('pokeApp').controller('DetailsCtrl', ['$scope', 'appFact', function($scope, appFact) {
  // setting all the details
  var setAttr = function() {
    if(appFact.pokemon){
      $scope.attack = appFact.pokemon.attack;
      $scope.defense = appFact.pokemon.defense;
      $scope.name = appFact.pokemon.name;
      $scope.$apply();  // begin the "digestion" of new data
    }
  };
  setInterval(setAttr, 1100); // setting continuous checking
}]);