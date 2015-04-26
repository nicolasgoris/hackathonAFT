angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DataBase) {

  $scope.today = new Date();

  var services = [];
  $.getJSON(DataBase.getDBContent('services'),function(data){
    $scope.$apply(function() {
      $scope.services = data.rows[0].value;
      $.each($scope.services, function(key, value){
        services.push(value);
      });
      $scope.services = services;
    });
  })

  var reservations = [];
  $.getJSON(DataBase.getReservationsByUser('s081708@ap.be'),function(data){
    $scope.$apply(function() {
      $scope.reservations = data.rows[0].value;
      $.each($scope.reservations, function(key, value) {
        var startdate = new Date(value.startdate);
        var enddate = new Date(value.enddate);
        enddate.setDate(enddate.getDate()+1);
        if ($scope.today > startdate && $scope.today < enddate) {
          reservations.push(value);
        }
      $scope.reservations = reservations;
      });
    });
  })


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

.controller('ReservationCtrl', function($scope, DataBase, User) {
	/*$http.get(DataBase.getDBContent('devices'))
		.success(function (data) {
		$scope.devices = data.rows;
	});*/
	$scope.reservation = {};
	$scope.now = new Date().toISOString().split('T')[0];
	$scope.mindate = $scope.now;
	$scope.data = [];
	$scope.types = [];
	$scope.devices = [];
	$scope.newReservation = [];
	$.getJSON(DataBase.getDBContent('devices'), function(data) {
		$scope.$apply(function() {
<<<<<<< HEAD
			$scope.data = data.rows[0].value;
			$.each($scope.data, function(key, value) {
				$scope.types.push(value.type);
=======
			$scope.data = data.rows[0];
			$.each($scope.data.value, function(key, value) {
				$scope.types.push(capitalize(value.type));
>>>>>>> master
			});
		});
	});
	function capitalize(string){
		var newString = string;
		if (itemIsLowerCaseLetter(string.charAt(0))){
			newString = string.charAt(0).toUpperCase() + string.substring(1, string.length);
		}
		return newString;
	}
	function itemIsLowerCaseLetter(item) {
        return item.toUpperCase().toLowerCase() === item;
    };
	$("select[name='devicetype']").change(function() {
		var devicetype = $( this ).val();
		$scope.devices = [];
		$.each($scope.data.value, function(key, value) {
			if (value.type == devicetype.toLowerCase()) {
				$.each(value.devices, function(key, value) {
					if (value.available) {
						$scope.devices.push(value);
					}
				});
			}
		});
	});
	$scope.startFilled = function(){
		if($scope.newReservation.startDate != undefined){
			var date = $scope.newReservation.startDate;
			date.setDate(date.getDate()+1);
			$scope.mindate = date.toISOString().split('T')[0];
		}
		else {
			$scope.newReservation.endDate = undefined;
			$scope.mindate = $scope.now;
		}
	};
	$scope.saveReservation = function(){
		var date = $scope.newReservation.endDate;
		date.setDate(date.getDate()+1);
		$scope.reservation.type = 'reservation';
		$scope.reservation.device = $scope.newReservation.actualDevice.id;
		$scope.reservation.snumber = User.getUser().id;
		$scope.reservation.end = date.toISOString().split('T')[0];
		$scope.reservation.start = $scope.newReservation.startDate.toISOString().split('T')[0];
		$scope.reservation.valid = true;
		console.log($scope.reservation);
		var json = JSON.stringify($scope.reservation);
		console.log(json);
		$.ajax({
			type:	'POST',
			url:	DataBase.getPostURL(),
			data:	json,
			xhrFields: {
				withCredentials: true
			},
			contentType: 'application/json',
			async:	true,
			success:function(data){
				console.log('success');
				console.log(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(errorThrown); 
			}
		});
	};
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

.controller('AccountCtrl', function($scope, DataBase) {
	$scope.settings = {
		enableFriends: true
	};
	$scope.logout = function() {
		console.log('logout');
	};
});
