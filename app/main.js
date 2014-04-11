require.config({
	baseUrl: 'app',
	//urlArgs: 'v='+parseInt(Math.random().toString().substr(2,8))
	waitSeconds: 0,
});

require(
	[
		'app',
		'controllers/HeaderCtrl',
		'services/routeResolver',
		'services/config',
		'services/resources',
		'directives/repeater',
		'directives/form',
	],
	function() {
		angular.bootstrap(document,['myApp']);
	}
);