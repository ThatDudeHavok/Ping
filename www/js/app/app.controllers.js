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
    $scope.state.id = 'addContacts';
    $scope.getAllContacts();
  };

  $scope.addContactToFriendsList = function(id, p, c) {
    $scope.selected[id] = !$scope.selected[id];
  };

  $scope.addSelectedContacts = function() {
    $scope.state.id = 'main';
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

  /* (function(arr) {
      var contacts = [];
      var tmpc = [];
      arr.forEach(function(e) {
        if(tmpc.length === 3) {
          contacts.push(tmpc);
          tmpc = [];
        }
        tmpc.push(e);
      });
      contacts.push(tmpc);
      if(tmpc.length === 3) contacts.push([]);
      $scope.contacts = contacts;
  })([1,2,3,4,5]);
  */

  $scope.state = {
    id: 'main'
  };

  $scope.profiles = [];
  $scope.selected = {};

  $scope.getAllContacts = function() {
    $cordovaContacts.find({}).then(function(allContacts) {

      var contacts = [];
      var tmpc = [];
      var contactWidth = window.innerWidth * (.9/3);
      var ctx = document.createElement('canvas').getContext('2d');

      allContacts.forEach(function(e, i) {
        if(Array.isArray(e.phoneNumbers)) {
          if(!e.phoneNumbers.length) return;
        } else {
          return; // console.log(e);
        }
        if(tmpc.length === 3) {
          contacts.push(tmpc);
          tmpc = [];
        }

        ctx.font = '10pt PT Sans';
        var txt = e.name.formatted;
        var width = ctx.measureText(txt).width;
        var split = txt.split(' ');

        if(width > contactWidth-6) {
          if(split.length > 1) txt = split.slice(0, split.length-1).join(' ') + ' ' + split[split.length-1].substr(0, 1) + '.';
        }

        e.initials = split[0].substr(0, 1) + split[split.length-1].substr(0, 1);
        e.displayname = txt;

        if(e.photos) {
          if(ionic.Platform.platform() === 'android') {
            $scope.profiles[e.id] = {
              'background-image': 'url("' + e.photos[0].value + '")',
              'background-size': '100% 100%'
            };
          } else {
            $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, e.photos[0].value.split('/').pop()).then(function(res) {
              var blob = new Blob([res], {type: "image/jpeg"});
              $scope.profiles[e.id] = {
                'background-image': 'url("' + URL.createObjectURL(blob) + '")',
                'background-size': '100% 100%'
              };
            }).catch(function(err) {
              throw err;
            });
          }
        }

        tmpc.push(e);
      });
      contacts.push(tmpc);

      $scope.phoneContacts = contacts;
    }).catch(function(err) {
      throw err;
    });
  };

  $scope.getIndex = function(p, c) {
    return p*3+c;
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

