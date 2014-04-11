'use strict';

define(['app'], function (app) {

	app.factory('config', function() {

		var config = {};

		var props = {
			'apptitle':'Ibiza',
			'TABLE_ROWS':10,
			'slideTime':300,
			'timeout':20000,
			'sessionTime':1000*60*23,
		}

		config.get = function(prop) {
			return props[prop];
		};

		config.set = function(prop,value) {
			props[prop]=value;
		};

		config.getAbsoluteLeft = function() {
			if ($('.ruta').length) return ($('.ruta').offset().left * 100 / $(window).width())+"%";
			return "0%";
		};

		config.isMobile = {
			Android: function() { return navigator.userAgent.match(/Android/i); },
			BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
			iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
			Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
			Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
			any: function() { return (config.isMobile.Android() || config.isMobile.BlackBerry() || config.isMobile.iOS() || config.isMobile.Opera() || config.isMobile.Windows()); }
		};

		return config;

	});

});