// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Ping', [
    'ionic',
    'ionic.service.core', 
    'Ping.app.controllers',
    'Ping.app.directives',
    'Ping.app.services' 
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // on docs.ionic.io/docs/push-usage just after plugin options
    // section is where to pick up.
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
      StatusBar.styleDefault();
    }
  });
});
//.controller('PingController', function() {
//
//});
