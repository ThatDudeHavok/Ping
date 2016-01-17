var app = angular.module('Ping.app.controllers', []);


app.controller('PingCtrl', function($scope, $firebaseArray, $firebaseAuth, $window, $http, $cordovaSocialSharing, $cordovaContacts, MessageTpls, $cordovaFile, FriendsList) {
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

  $scope.contactsHash = {};

  $scope.addContacts = function() {
    $scope.state.id = 'addContacts';
    $scope.getAllContacts();
  };

  $scope.addContactToFriendsList = function(id, p, c) {
    $scope.selected[id] = !$scope.selected[id];
  };

  $scope.addSelectedContacts = function() {
    var selected = Object.keys($scope.selected).filter(function(e) { return $scope.selected[e]; });
    selected.forEach(function(e) {
      console.log(e);
      FriendsList.addFriend($scope.contactsHash[e]);
    });
    FriendsList.save();
    $scope.contacts = displayify(FriendsList);
    resetSelectState();
  };

  $scope.cancelAddContacts = function() {
    resetSelectState();
  };

  function resetSelectState() {
    $scope.state.id = 'main';
    $scope.selected = {};
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

  $scope.pingViaSMS = function(tpl) {
    
    var c = $scope.contact_to_ping;
    console.log(c);
    if(c.phoneNumbers.length > 1) {
    }
    var num = c.phoneNumbers[0].value;
    $cordovaSocialSharing.shareViaSMS(tpl.tpl, num, function(res) {
      console.log(res);
      $scope.state.id = 'main';
      $scope.contact_to_ping = null;
    }, function(err) {
      throw err;
    });
  };

  $scope.messageTemplates = MessageTpls;

  $scope.pingContact = function(contact) {
    console.log(contact);
    $scope.contact_to_ping = contact;
    $scope.state.id = 'pingContact';
  };

  $scope.contacts = displayify(FriendsList);

  function displayify(arr) {
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
      return contacts;
  }

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
        e.contact_key = ionic.Platform.platform() + '_' + e.id;
        if(_.contains(_.pluck(FriendsList, 'contact_key'), e.contact_key)) return;

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
        $scope.contactsHash[e.id] = e;
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
  }
  
  // currently pings need to be sent to hardcoded user_ids. 
  $scope.sendPing = function() {
    console.log('sendPing hit');
    var privateKey = "4f517b480392b68eab406a190c018724a55a6e1ccdca5f47";
    var user_ids = [""];
    var appId = "11acd47c"; 
    var tokens = [""]
    var auth = btoa(privateKey + ":");

    var req = {
      method: "POST",
      url: "https://push.ionic.io/api/v1/push",
      headers: {
        "Content-Type": "application/json",
        "X-Ionic-Application-Id": "11acd47c",
        "Authorization": "basic " + auth 
      },
      data: {
        "user_ids": user_ids,
        "notification": {
          "alert": "Illuminati confirmed" 
        } 
      } 
    }
    
    $http(req).success(function(resp) {
      console.log("PUSH SUCCESS!"); 
    }).error(function(resp) {
      console.log(resp);
    });

  }; // end fn sendPing
})

