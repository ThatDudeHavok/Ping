// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Ping', [
    'ngCordova',
    'ionic',
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

    Ionic.io();

    var user = Ionic.User.current();
    
    if(!user.id) {
      user.id = Ionic.User.anonymousId();
      //user.id = 'custom-user-id' 
    }
    
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload); 
        alert(notification); 
      },
      "onRegister": function(data) {
        console.log('onRegister - Token:', data.token);
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
    console.log(push);
   
    var callback = function(token) { 
      user.addPushToken(token);
      user.save();
    }

    
    push.register(callback);
  });
});
