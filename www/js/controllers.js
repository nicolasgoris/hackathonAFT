angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	$scope.services = {"computers":true, "laptops":true, "videocameras":false, "studyplaces":true};
	$scope.news = [
       {
           "startdate": "2015-04-24",
           "enddate": "2015-04-25",
           "title": "nieuwe goed APp",
           "text": "de ontwikkeling van de nieuw APp is bijna klaar.",
           "img": ""
       },
       {
           "startdate": "2015-04-24",
           "enddate": "2015-04-26",
           "title": "wie maakte de laptops kapot?",
           "text": "we hebben de laptops vorig weekend eens nagekeken en hebben vast gesteld dat er ongeveer een 5 tal laptops kapot zijn. We hebben nagetrokken wie dit zouden zijn maar we willen deze personen graag de kans geven om hier zelf voor uit te komen.",
           "img": ""
       }
   ]
})

.controller('ReserveCtrl', function($scope, Devices) {
	$scope.laptops = Devices.all();
	$scope.tablets = Devices.some();
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
