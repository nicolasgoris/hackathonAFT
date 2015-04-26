angular.module('starter.services', [])

.factory('DataBase', function($rootScope) {
	$rootScope.key = 'ndirmrstimeatcheringplec';
	$rootScope.pass = 'Xa3utsiV0mbi8qI3HAp6UYKa';
	$rootScope.db = 'https://' + $rootScope.key + ':' + $rootScope.pass + '@nicolas.cloudant.com/hackathonatf/';
	$rootScope.content = '_design/views/_view/TypeData?key=';
	$rootScope.reservations = '_design/views/_view/reservations';
	return {
		getPostURL: function() {
			return $rootScope.db;
		},
		getDBContent: function(type) {
			return $rootScope.db + $rootScope.content + '"' + type + '"&callback=?';
		},
		getReservationsByDevice: function(device) {
			return $rootScope.db + $rootScope.reservations + 'ByDevice?key="' + device + '"&callback=?';
		},		
		getReservationsByUser: function(snumber) {
			return $rootScope.db + $rootScope.reservations +  'ByUser?key="' + snumber + '"&callback=?';
		}
	};
})

.factory('User', function($rootScope) {
	$rootScope.user = [];
	$rootScope.user.id = 's081708@ap.be';
	$rootScope.user.name = 'Nicolas Goris';
	$rootScope.user.mail = 'nicolas.goris@student.ap.be';
	return {
		getUser: function() {
			return $rootScope.user;
		}
	};
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
