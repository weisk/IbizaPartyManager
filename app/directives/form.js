'use strict';

define(['app'], function(app) {

	app.directive('autofillFix', function($rootScope,$timeout){

		return function(scope, elem, attrs) {
			elem.prop('method', 'POST');
			if(attrs.ngSubmit) {
				elem.unbind('submit').submit(function(e) {
					e.preventDefault();
					elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
					scope.safeApply(attrs.ngSubmit);
				});
			}
		};

	});

	app.directive('formSubmit', function($rootScope){

		return function(scope, elem, attrs) {
			elem.click(function(e){
				e.preventDefault();
				$(elem).closest('form').submit();				
			});
		};

	});

});