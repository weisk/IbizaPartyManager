'use strict';

define(['app'], function(app) {

	app.controller('HeaderCtrl',['$rootScope','$scope','Api',
		function($rootScope,$scope,Api){


			$scope.login = function() {
				var params = 'user='+$scope.login.user+'&pass='+$scope.login.pass;
				Api.login(params)
					.success(function(data,status,headers,config) {
						if(data && data[0] && data[0].login) {
							$rootScope.user.logged = 'true';
							$location.path('/admin');
						} else {
							alert('Bad credentials!');
						}
					})
					.error(function(data,status,headers,config) {
						alert('Bad credentials!');
					});
			}

			var _init = function(){
				
			};
			_init();

	}]);

});