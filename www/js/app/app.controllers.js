// Controllers for project


var app = angular.module('Ping.app.controllers', []);

app.controller('PingCtrl', function($scope, $firebaseArray, $firebaseAuth, $window, $http) {
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

  $scope.logout = function() {
    Auth.$unauth();
    $window.location.reload(true);
  };

  $scope.authFB = function() {
    
  };

  $scope.getPicture = function() {
    var url = 'https://graph.facebook.com/v2.5/me/picture?type=normal&access_token=' + $scope.token;
    $http.get(url,{responseType: "arraybuffer"}).then(function(res) {
      console.log(res);
      var blob = new Blob([res.data], {type: "image/jpeg"});
      $scope.profile = {
        'background-image': 'URL("' + URL.createObjectURL(blob) + '")',
        'background-size': '100% 100%'
      };
    }).catch(function(err) {
      throw err;
    });
  };


  $scope.getFriends = function() {
    var url = 'https://graph.facebook.com/v2.5/me/friends?access_token=' + $scope.token;
    $http.get(url).then(function(res) {
      console.log(res);
    }).catch(function(err) {
      throw err;
    });
  };

  $scope.login = function() {
    var perms = {
      scope: 'email,user_friends'
    };
    Auth.$authWithOAuthRedirect("facebook", perms).then(function(authData) {
      // User successfully logged in
          console.log(authData);
          //$scope.token = authData.facebook.accessToken;
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook", perms).then(function(authData) {
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

