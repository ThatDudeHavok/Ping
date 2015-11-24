// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Ping', [
    'ionic',
    'ionic.service.core',
    'Ping.app.controllers',
    'Ping.app.directives',
    'Ping.app.services',
    'firebase',
    'ngCordova'
])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    
    // Kick off the platform web  client. 
    Ionic.io();

    // This will give you a fresh user or the previously
    // saved 'current user'.
    var user = Ionic.User.current();
    
    // If the user doesn't have an id, you'll need to give it one. 
    if(!user.id) {
      user.id = Ionic.User.anonymousId();
      // user.id = 'your-custom-user-id';
    }
    
    // Persist the user.
    // Reference for more in-depth user jazz: 
    // http://docs.ionic.io/docs/user-quick-start
    user.save(); 
    
    //
    // Maybe thing about having the ring around the portait be red or green. 
    // Whether or not a user is available to ping would dictate that color.
    // A green ring would indicate they can be bothered, whereas red would
    // indicate that they cannot talk. 
    //
    
    var settings = new Ionic.IO.Settings();
    var app_id = settings.get('app_id'); 
    
    console.log('SETTINGS:', settings);
    console.log('APP_ID', app_id); 
   
    var push = new Ionic.Push({
      "debug": false,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log('DATA.TOKEN:', data.token);
      },
      "pluginConfig": {
        "android": {
          "iconColor": "#343434" 
        } 
      } 
    });

    push.register(function(token) {
      console.log("DEVICE TOKEN:", token.token); 
    });
    
    var callback = function(pushToken) {
      console.log(pushToken.token);
    }

    push.register(callback);

    console.log(push);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      ionic.Platform.fullScreen();
      StatusBar.hide();
    }
  });
})
.controller('PingController', function() {

});
