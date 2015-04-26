<<<<<<< HEAD
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DataBase, User) {
	$scope.today = new Date();
	$scope.news = [];
	$scope.reservations = {"current": [], "passed": []};
	
	$.getJSON(DataBase.getDBContent('services'),function(data){
		$scope.$apply(function() {
			$scope.services = data.rows[0].value;
		});
	})

	$.getJSON(DataBase.getReservationsByUser(User.getUser().id) ,function(data){
		$scope.$apply(function() {
			var reservations = data.rows;
			$.each(reservations, function(key, value) {
				var startdate = new Date(value.value.start);
				var enddate = new Date(value.value.end);
				enddate.setDate(enddate.getDate()+1);
				if ($scope.today <= enddate) {
					$scope.reservations.current.push(value.value);
				}
				else {
					$scope.reservations.passed.push(value.value);
				}
			});
		});
	})

	$.getJSON(DataBase.getDBContent('news'), function(data) {
		$scope.$apply(function() {
			$.each(data.rows[0].value, function(key, value) {
				var startdate = new Date(value.startdate);
				var enddate = new Date(value.enddate);
				enddate.setDate(enddate.getDate()+1);
				if ($scope.today > startdate && $scope.today < enddate) {
					$scope.news.push(value);
				}
			});
		});
	});
	
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		if( states.fromCache && states.stateName == "tab.dash" ) {
			console.log('other tab');
		}
	});
})

.controller('ReservationCtrl', function($scope, DataBase, User) {
	/*$http.get(DataBase.getDBContent('devices'))
		.success(function (data) {
		$scope.devices = data.rows;
	});*/
	var tempdate = new Date();
	$scope.now = tempdate.toISOString().split('T')[0];
	$scope.mindate1 = $scope.now;
	$scope.mindate = $scope.now;
	tempdate.setDate(tempdate.getDate()+13);
	$scope.maxdate1 = tempdate.toISOString().split('T')[0];
	tempdate.setDate(tempdate.getDate()+7);
	$scope.maxdate2 = tempdate.toISOString().split('T')[0];
	$scope.data = [];
	$scope.types = [];
	$scope.devices = [];
	$scope.newReservation = [];
	$.getJSON(DataBase.getDBContent('devices'), function(data) {
		$scope.$apply(function() {
			$scope.data = data.rows[0].value;
			$.each($scope.data, function(key, value) {
				$scope.types.push(capitalize(value.type));
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
		$.each($scope.data, function(key, value) {
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
			if($scope.newReservation.startDate > $scope.newReservation.endDate){
				$scope.newReservation.endDate = undefined;
			}
			var date = $scope.newReservation.startDate;
			date.setDate(date.getDate()+1);
			$scope.mindate = date.toISOString().split('T')[0];
			date.setDate(date.getDate()+7);
			$scope.maxdate2 = date.toISOString().split('T')[0];
		}
		else {
			$scope.mindate = $scope.now;
			var tempdate = new Date();
			tempdate.setDate(tempdate.getDate()+20);
			$scope.maxdate2 = tempdate.toISOString().split('T')[0];
		}
	};
	$scope.saveReservation = function(){
		var date = $scope.newReservation.endDate;
		date.setDate(date.getDate()+1);
		$scope.reservation = {};
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

.controller('AccountCtrl', function($scope, User) {
	$scope.user = User.getUser();
	$scope.logout = function() {
		console.log('logout');
	};
});
=======
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DataBase, User) {
	$scope.today = new Date();
	$scope.news = [];
	$scope.reservations = {"current": [], "passed": []};
	
	$.getJSON(DataBase.getDBContent('services'),function(data){
		$scope.$apply(function() {
			$scope.services = data.rows[0].value;
		});
	})

	$.getJSON(DataBase.getReservationsByUser(User.getUser().id) ,function(data){
		$scope.$apply(function() {
			var reservations = data.rows;
			$.each(reservations, function(key, value) {
				var startdate = new Date(value.value.start);
				var enddate = new Date(value.value.end);
				enddate.setDate(enddate.getDate()+1);
				if ($scope.today <= enddate) {
					$scope.reservations.current.push(value.value);
				}
				else {
					$scope.reservations.passed.push(value.value);
				}
			});
		});
	})

	$.getJSON(DataBase.getDBContent('news'), function(data) {
		$scope.$apply(function() {
			$.each(data.rows[0].value, function(key, value) {
				var startdate = new Date(value.startdate);
				var enddate = new Date(value.enddate);
				enddate.setDate(enddate.getDate()+1);
				if ($scope.today > startdate && $scope.today < enddate) {
					$scope.news.push(value);
				}
			});
		});
	});
	
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		if( states.fromCache && states.stateName == "tab.dash" ) {
			console.log('other tab');
		}
	});
})

.controller('ReservationDetailCtrl', function($scope, DataBase, User) {
	$scope.today = new Date();
	$scope.reservations = {"current": []};
	$.getJSON(DataBase.getReservationsByUser(User.getUser().id) ,function(data){
		$scope.$apply(function() {
			var reservations = data.rows;
			$.each(reservations, function(key, value) {
				console.log(value);
				var startdate = new Date(value.value.start);
				var enddate = new Date(value.value.end);
				enddate.setDate(enddate.getDate()+1);
				if ($scope.today <= enddate) {
					$.getJSON(DataBase.getDeviceById(value.value.device), function(data) {
						value.value.device = data.rows[0].value;
					})
					$scope.reservations.current.push(value.value);
				}
			});
		});
	})
})

.controller('ReservationCtrl', function($scope, DataBase, User) {
	/*$http.get(DataBase.getDBContent('devices'))
		.success(function (data) {
		$scope.devices = data.rows;
	});*/
	var tempdate = new Date();
	$scope.now = tempdate.toISOString().split('T')[0];
	$scope.mindate1 = $scope.now;
	$scope.mindate = $scope.now;
	tempdate.setDate(tempdate.getDate()+13);
	$scope.maxdate1 = tempdate.toISOString().split('T')[0];
	tempdate.setDate(tempdate.getDate()+7);
	$scope.maxdate2 = tempdate.toISOString().split('T')[0];
	$scope.data = [];
	$scope.types = [];
	$scope.devices = [];
	$scope.newReservation = [];
	$.getJSON(DataBase.getDBContent('devices'), function(data) {
		$scope.$apply(function() {
			$scope.data = data.rows[0].value;
			$.each($scope.data, function(key, value) {
				$scope.types.push(capitalize(value.type));
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
		$.each($scope.data, function(key, value) {
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
			if($scope.newReservation.startDate > $scope.newReservation.endDate){
				$scope.newReservation.endDate = undefined;
			}
			var date = $scope.newReservation.startDate;
			date.setDate(date.getDate()+1);
			$scope.mindate = date.toISOString().split('T')[0];
			date.setDate(date.getDate()+7);
			$scope.maxdate2 = date.toISOString().split('T')[0];
		}
		else {
			$scope.mindate = $scope.now;
			var tempdate = new Date();
			tempdate.setDate(tempdate.getDate()+20);
			$scope.maxdate2 = tempdate.toISOString().split('T')[0];
		}
	};
	$scope.saveReservation = function(){
		var date = $scope.newReservation.endDate;
		date.setDate(date.getDate()+1);
		$scope.reservation = {};
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
>>>>>>> c05680c74db227e1b5b289a79b095ddcdb5cf4ba
