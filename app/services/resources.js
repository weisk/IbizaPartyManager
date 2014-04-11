'use strict';

define([],function(){

	var Resources = angular.module('Resources',[])

	Resources.factory('Api', ['$http','config',
		function($http,config){

			var base = '/api';

			return {
				'parties': function() {
					return $http({
						method:'GET',
						url: base + '/parties',
					});
				},
				'partyinfo': function(id) {
					return $http({
						method:'GET',
						url: base + '/party/' + id,
					});
				},
				'join': function(id,params) {
					return $http({
						method:'POST',
						url: base + '/party/'+id+'/RSVP',
						data: params
					});	
				},
				'login': function(params) {
					return $http({
						method:'POST',
						url: base + '/login',
						data: params
					});
				},				
				'newparty': function(params) {
					return $http({
						method:'PUT',
						url: base + '/party',
						data: params
					});
				},
				'register': function(params) {
					return $http({
						method:'POST',
						url: base + '/user/register',
						data: params
					});
				},
			}
		}
	]);

});