// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Ping', [
    'ngCordova',
    'ionic',
    'ionic.service.core',
    'ionic.service.push',
    'Ping.app.controllers',
    'Ping.app.directives',
    'Ping.app.services',
    'firebase',
    'ngCordova'
])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); 
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Phonegap is being used through pluginConfig


    
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload); 
      },
//      "onRegister": function(data) {
//        console.log('onRegister - Token:', data.token);
//      },
      "pluginConfig": {
        "ios": {
          "badge": true
        }, 
        "android": {
          "vibrate": true, 
          "iconColor": "#343434" 
        } 
      } 
    });
    
    var callback = function(pushToken) {
      console.log(pushToken.token);
    }

    push.register(callback);

    console.log(push);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  });
})
.controller('PingController', function() {

  push.register(function(token) {
    console.log("Device token", token.token);
  }); 
    Ionic.io();
    
    var setToken = function(pushToken) {
      console.log('Registered token:', pushToken.token); 
      user.addPushToken(pushtoken.token);
      user.save();
    };
    
    var callback = function(pushToken) {
      console.log(pushToken.token); 
    };

    // this will give a fresh user or previously saved 'current user' 
    var user = Ionic.User.current();

    // if the user doesn't have an id, one is given
    if(!user.id) {
      user.id = Ionic.User.anonymousId();
      //user.id = 'your-custom-user-id'; 
    } 
    
    

    var name = user.get('name'); 
    if(ionic.Platform.isAndroid()) {
      user.set('name', 'phone');
    } else {
      user.set('name', 'computer'); 
    }
    

    push.register(setToken);   
    console.log('user data:', user);

    var success = function(response) {
      console.log('you\'re gewd'); 
      console.log(user.get('name')) 
      console.log(user);
    };

    var failure = function(response) {
      console.log('You gone and fucked up'); 
    };
    
  })
}) 
