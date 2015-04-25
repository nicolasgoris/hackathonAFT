angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	$scope.services = {"computers":true, "laptops":true, "videocameras":false, "studyplaces":true};
	$scope.news = [{"title": "hello world", "body": "nieuws test", "startDate": "15 jan","endDate":"16jan"},{"title": "hello world", "body": "nieuws test", "startDate": "15 jan","endDate":"16jan"}]
})

.controller('ReservationCtrl', function($scope, $http, DataBase) {
	/*$http.get(DataBase.getDBContent('devices'))
		.success(function (data) {
		$scope.devices = data.rows;
	});*/
	$scope.data = [];
	$scope.types = [];
	$scope.devices = [];
	$scope.newReservation = [];
	$.getJSON(DataBase.getDBContent('devices'), function(data) {
		$scope.$apply(function() {
			$scope.data = data.rows[0];
			$.each($scope.data.value, function(key, value) {
				$scope.types.push(value.type);
			});
		});
	});
	$("select[name='devicetype']").change(function() {
		var devicetype = $( this ).val();
		$scope.devices = [];
		$.each($scope.data.value, function(key, value) {
			if (value.type == devicetype) {
				$.each(value.devices, function(key, value) {
					if (value.available) {
						$scope.devices.push(value);
					}
				});
			}
		});
	});
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
