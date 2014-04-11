'use strict';

define(['app'], function(app) {

	app.directive('informWhenLast', function($rootScope){

		return function(scope,rootScope,element, attrs) {
			if (scope.$last) $rootScope.$broadcast("finishRepeater");
		};

	});

});