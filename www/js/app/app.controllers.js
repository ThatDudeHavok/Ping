angular.module("Ping.app.controllers", [])

.controller("PingController", 
    function($scope, $cordovaPush, $cordovaDialogs, $cordovaMedia, 
             $cordovaToast, ionPlatform, $http) {

//  console.log($cordovaPush);

  $scope.sendPing = function($scope, req) {

  var privateKey = "4f517b480392b68eab406a190c018724a55a6e1ccdca5f47";
  var user_ids = [];
  var appId = "11acd47c"; 
  var tokens = ["1f87fe46-1205-4783-b6f1-639bd3fa3b04"]
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
      "user_ids": ["db44f7c9-c96c-48af-a1eb-aa28236f1047"],
      "notification": {
        "alert": "Illuminati confirmed" 
      } 
    } 
  }

//    $http(req).success(function(resp) {
//      console.log("PUSH SUCCESS!"); 
//    }).error(function(resp) {
//      console.log("push error."); 
//      console.log(req);
//      console.log(resp); 
//    }); 
  };
});
