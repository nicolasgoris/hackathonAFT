angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, DataBase, User) {
	$scope.today = new Date();
	$scope.news = [];
	$scope.reservations = {"current": [], "passed": []};
	
	$scope.refreshServices = function() {
		$.getJSON(DataBase.getDBContent('services'),function(data){
			$scope.$apply(function() {
				$scope.services = data.rows[0].value;
			});
		});
	};
	
	$scope.refreshReservations = function() {
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
		});
	};
	
	$scope.refreshNews = function() {
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
	};
	
	$scope.refresh = function() {
		$scope.today = new Date();
		$scope.news = [];
		$scope.reservations = {"current": [], "passed": []};
		$scope.refreshServices();
		$scope.refreshReservations();
		$scope.refreshNews();
	};
	
	$scope.refresh();
	
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		if( states.fromCache && states.stateName == "tab.dash" ) {
			$scope.refresh();
		};
	});
})

.controller('ReservationDetailCtrl', function($scope, $location, DataBase, User) {
	$scope.refreshReservations = function() {
		$scope.today = new Date();
		$scope.reservations = {"current": []};
		$.getJSON(DataBase.getReservationsByUser(User.getUser().id) ,function(data){
			$scope.$apply(function() {
				var reservations = data.rows;
				$.each(reservations, function(key, value) {
					var startdate = new Date(value.value.start);
					var enddate = new Date(value.value.end);
					enddate.setDate(enddate.getDate()+1);
					if ($scope.today <= enddate) {
						$.getJSON(DataBase.getDeviceById(value.value.device), function(data) {
							value.value.device = data.rows[0].value;
						});
						$scope.reservations.current.push(value.value);
					};
				});
				$scope.reservations.current.sort(function(a, b) { return new Date(a.start).getTime() > new Date(b.start).getTime() } );
			});
		});
	};
	
	$scope.remove = function(reservation) {
		var device = reservation.device.id
		reservation.device = device;
		delete reservation.$$hashKey;
		reservation.valid = false;
		console.log(reservation);
		console.log(DataBase.getPostURL() + reservation._id);
		var json = JSON.stringify(reservation);
		console.log(reservation);
		$.ajax({
			type:	'PUT',
			url:	DataBase.getPostURL() + reservation._id,
			data:	json,
			xhrFields: {
				withCredentials: true
			},
			contentType: 'application/json',
			async:	true,
			success:function(data){
				$location.path("#/dash");
				window.location.replace("#/dash");
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				console.log(errorThrown); 
			}
		});
	}
	
	$scope.refreshReservations();
	
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		if( states.fromCache && states.stateName == "tab.reservations" ) {
			$scope.refreshReservations();
		}
	});
})

.controller('ReservationCtrl', function($scope, $stateParams, $location, DataBase, User) {
	$scope.$on( "$ionicView.enter", function( scopes, states ) {
		if ($stateParams.deviceType != undefined){
			$scope.deviceType = capitalize($stateParams.deviceType);
			$.getJSON(DataBase.getDBContent('devices'), function(data) {
				$scope.$apply(function() {
					$scope.data = data.rows[0].value;
					$scope.devices = [];
					$.each($scope.data, function(key, value) {
						if (value.type == $scope.deviceType.toLowerCase()) {
							$.each(value.devices, function(key, value) {
								if (value.available) {
									$scope.devices.push(value);
								}
							});
						}
					});
				});
			});
		}
	});
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
			var tempdate = new Date();
			tempdate.setDate(date.getDate()+1);
			$scope.mindate = tempdate.toISOString().split('T')[0];
			tempdate.setDate(tempdate.getDate()+7);
			$scope.maxdate2 = tempdate.toISOString().split('T')[0];
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
		var date2 = $scope.newReservation.startDate;
		date2.setDate(date2.getDate()+1);
		$scope.reservation = {};
		$scope.reservation.type = 'reservation';
		$scope.reservation.device = $scope.newReservation.actualDevice.id;
		$scope.reservation.snumber = User.getUser().id;
		$scope.reservation.end = date.toISOString().split('T')[0];
		$scope.reservation.start = date2.toISOString().split('T')[0];
		$scope.reservation.valid = true;
		var json = JSON.stringify($scope.reservation);
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
				$location.path("#/dash");
				window.location.replace("#/dash");
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