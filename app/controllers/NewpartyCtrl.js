'use strict';

define(['app'], function(app) {

	app.register.controller('NewpartyCtrl',['$scope','$rootScope','config','Api','$location','$route',
		function($scope,$rootScope,config,Api,$location,$route) {

			$rootScope.title = 'Home';
			
			$scope.create = function() {
				var params = 'name='+$scope.party.name+'&location='+$scope.party.location+'&date='+$scope.party.date;
				Api.newparty(params)
					.success(function(data,status,headers,config) {
						if(data === true || data === "true") {
							alert('success!');
							$route.reload();
						} else {
							alert('Error!');
						}
					})
					.error(function(data,status,headers,config) {
						alert('Error!');
					});
			}
			var _init = function() {
				if(!$rootScope.user.logged) $location.path('/home');
			}
			_init();
		}
	]);
});