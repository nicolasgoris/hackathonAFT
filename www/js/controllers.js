angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DataBase) {
	$scope.services = {"computers":true, "laptops":true, "videocameras":false, "studyplaces":true};
	$scope.today = new Date();
  var news = [];
  $.getJSON(DataBase.getDBContent('news'), function(data) {
    $scope.$apply(function() {
      $scope.news  = data.rows[0].value;
      $.each($scope.news, function(key, value) {
        var startdate = new Date(value.startdate);
        var enddate = new Date(value.enddate);
        enddate.setDate(enddate.getDate()+1);
        if ($scope.today > startdate && $scope.today < enddate) {
          news.push(value);
        }
      });
      $scope.news = news;
      });
    });
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
