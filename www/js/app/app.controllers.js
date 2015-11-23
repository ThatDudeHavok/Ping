// Controllers for project


angular.module('Ping.app.controllers', [])

//.run(function($ionicPlatform){
//
//  $ionicPlatfrom.ready(function() {
//
//    var push = new Ionic.Push({
//      "debug": true 
//    });
//    push.register(function(token) {
//      console.log("Device token: ", token.token);
//    });
//  });
//})

.controller('PingsController', function($scope){
  $scope.sendPing = function() {
    console.log('test'); 
  };
});
