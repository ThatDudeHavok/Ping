// Controllers for project


var app = angular.module('Ping.app.controllers', []);

app.controller('PingCtrl', function($scope, $firebaseArray, $firebaseAuth) {
  var itemsRef = new Firebase("https://shining-heat-1764.firebaseio.com/items");
  var Items = $firebaseArray(itemsRef);
  $scope.items = Items;
  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };

  itemsRef.on('child_added', function(snap) {
    console.log(snap.val());
  });

  var usersRef = new Firebase("https://shining-heat-1764.firebaseio.com/users");
  var Auth = $firebaseAuth(usersRef);

  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
          console.log(authData);
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      } else {
        // Another error occurred
        console.log(error);
      }
    });
  };
});
