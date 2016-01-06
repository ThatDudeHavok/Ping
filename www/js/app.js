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
    'Ping.app.services' 
])

.run(function($ionicPlatform) {
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
    
    push.register(function(token) {

      console.log("Device token", token.token);
      console.log('spaaaget!!!!'); 
    }); 
   
  })
}) 
