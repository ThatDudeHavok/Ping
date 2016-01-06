// Add application directives here

angular.module('Ping.app.directives', [])

.factory(("ionPlatform"), function($q) {
  var ready = $q.defer();

  ionic.Platform.ready(function(device) {
    ready.resolve(device);
  });

  return {
    ready: ready.promise
  }

})
