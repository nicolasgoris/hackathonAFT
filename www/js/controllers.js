angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	$scope.services = {"computers":true, "laptops":true, "videocameras":false, "studyplaces":true};
	$scope.today = new Date();
	$scope.news = [
		 {
           "startdate": "2015-04-23",
           "enddate": "2015-04-24",
           "title": "wie maakte de laptops kapot?",
           "text": "lala",
           "img": ""
       },
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
   ];
	var news = [];
	$.each($scope.news, function(key, value) {
		var startdate = new Date(value.startdate);
		var enddate = new Date(value.enddate);
		enddate.setDate(enddate.getDate()+1);
		if ($scope.today > startdate && $scope.today < enddate) {
			news.push(value);
		}
	});
	$scope.news = news;
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
			$scope.data = data.rows[0];
			$.each($scope.data.value, function(key, value) {
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
