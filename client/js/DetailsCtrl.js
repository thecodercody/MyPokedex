angular.module('pokeApp').controller('detailsController', ['$scope', 'appFact', function($scope, appFact) {
  
  
  // setting all the details
  var setAttr = function() {
    if(appFact){
      $scope.attack = appFact.attack;
      $scope.defense = appFact.defense;
      $scope.name = appFact.name;
      $scope.$apply();  // begin the "digestion" of new data
    }
  };
  setInterval(setAttr, 200); // setting continuous checking
}]);