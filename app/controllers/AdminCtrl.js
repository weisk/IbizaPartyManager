'use strict';

define(['app'], function(app) {

	app.register.controller('AdminCtrl',['$scope','$rootScope','config','Api','$location',
		function($scope,$rootScope,config,Api,$location) {

			$rootScope.title = 'Home';
			
			var _init = function() {
				if(!$rootScope.user.logged) $location.path('/home');
			}
			_init();
		}
	]);
});