// Controllers for project


var app = angular.module('Ping.app.controllers', []);

app.controller('PingCtrl', function($scope, $firebaseArray, $firebaseAuth, $window, $http, $cordovaSocialSharing, $cordovaContacts, MessageTpls, $cordovaFile) {
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

  $scope.addContacts = function() {
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
  $scope.token = 'CAADLjtrgsB8BACdtn4FbjKxjger4YsMIXS0ojzZAuqqqdZBDLDl1Gu0jR4lo1mJhQZA8EDLJnxAc8hk2rNlGqQb6rCH1jhpbJtZAcrunTka4JHT1y1HYI4Bgp4yAr9i7XriYZCkezzBuHzvOD4QIuLmrDd77sOpJrtdBDsJImFcbn2N0R5nwOpPZB1554FuZCJZC9R3qaddX8AZDZD';

  $scope.authFB = function() {
    
    $cordovaSocialSharing.shareViaSMS('galavanting around\n  (_|     (_|', '6086160254', function(res) {
      console.log(res);
    }, function(err) {
      throw err;
    });
  };

  $scope.messageTemplates = MessageTpls;

  $scope.pingContact = function(p, c) {
    console.log(p, c);
  };

  $scope.contacts = [[]];

  /* (function() {
      var contacts = [];
      var tmpc = [];
      [1,2,3,4,5].forEach(function(e) {
        if(tmpc.length === 3) {
          contacts.push(tmpc);
          tmpc = [];
        }
        tmpc.push(e);
      });
      contacts.push(tmpc);
      if(tmpc.length === 3) contacts.push([]);
      $scope.contacts = contacts;
  })();
  */

  window.cordfile = $cordovaFile;
  $scope.getAllContacts = function() {
    $cordovaContacts.find({}).then(function(allContacts) {
      console.log(allContacts);
      $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, allContacts[91].photos[0].value.split('/').pop()).then(function(res) {
        var blob = new Blob([res], {type: "image/jpeg"});
        $scope.profile = {
          'background-image': 'URL("' + URL.createObjectURL(blob) + '")',
          'background-size': '100% 100%'
        };
      }).catch(function(err) {
        throw err;
      });
      return;
      var contacts = [];
      var tmpc = [];
      allContacts.forEach(function(e) {
        if(Array.isArray(e.phoneNumbers)) {
          if(!e.phoneNumbers.length) return;
        } else {
          return console.log(e);
        }
        if(tmpc.length === 3) {
          contacts.push(tmpc);
          tmpc = [];
        }
        tmpc.push(e);
      });
      contacts.push(tmpc);
      if(tmpc.length === 3) contacts.push([]);
    });
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

