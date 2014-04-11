define(['services/routeResolver'],function(){

	var app = angular.module('myApp',['ngRoute','routeResolverServices','Resources','ngAnimate','ui.bootstrap']);

	app.config(['$locationProvider','$routeProvider','routeResolverProvider','$controllerProvider','$compileProvider','$filterProvider','$provide','$httpProvider',
		function($locationProvider,$routeProvider,routeResolverProvider,$controllerProvider,$compileProvider,$filterProvider,$provide,$httpProvider){


			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

			app.register = {
				controller:$controllerProvider.register,
				directive:$compileProvider.register,
				filter:$filterProvider.register,
				factory:$provide.factory,
				service:$provide.service
			};

			$locationProvider.html5Mode(false);
			var route = routeResolverProvider.route;

			$routeProvider
				.when('/home',route.resolve('Home'))
				.when('/admin',route.resolve('Admin'))
				.when('/newparty',route.resolve('Newparty'))
				.otherwise({redirectTo:'/home'});
		}
	]);

	app.run(['$rootScope','config','Api',
		function($rootScope, config, Api){

			$rootScope.apptitle = config.get('apptitle');
			$rootScope.user = { 
				"logged": true,
				"favs": [],
			 };
		
		}
	]);

	return app;

});