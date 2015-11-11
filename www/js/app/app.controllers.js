// Controllers for project


angular.module('Ping.app.controllers', []);

.controller('PingsController, function($scope){
  $scope.sendPing = function() {
    console.log('test'); 
  };
})
