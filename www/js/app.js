// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Ping', [
    'ngCordova',
    'ionic',
    'ionic.service.core',
    'Ping.app.controllers',
    'Ping.app.directives',
    'Ping.app.services',
    'firebase',
    'ngCordova'
])

<<<<<<< HEAD
.run(function($ionicPlatform, $cordovaStatusbar) {
=======
.run(function($ionicPlatform) {
>>>>>>> 0ac27ed... fuck the pyramids... that is all
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); 
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
   
    //
    // Note - don't use sounds untill default sound is added to app
    //

    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification){
        var payload = notification.payload;
        console.log(notification, payload); 
      },
      "onRegister": function(data) {
        console.log(data.token);
      },
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
      console.log('spaaaget!!!!'); 
    }); 
   
  })
}) 
