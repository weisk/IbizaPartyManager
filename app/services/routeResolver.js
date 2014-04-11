'use strict';

define([],function(){

	var services = angular.module('routeResolverServices',[]);

	//Must be a provider (as opposed to a service or factory) since it will be injected into module.config()
	services.provider('routeResolver', function() {
		this.$get=function(){return this;};
		this.routeConfig=function(){
			var viewsDir='views/',controllersDir = 'app/controllers/';
			return {
				setBaseDirectories:function(views,controllers){viewsDir=views;controllersDir=controllers;},
				getViewsDirectory:function(){return viewsDir;},
				getControllersDirectory:function(){return controllersDir;}
			};
		}();
		this.route=function(routeConfig){
			var resolve=function(baseName,deferred){
				var routeDef={};
				var deferred = deferred || {};
				routeDef.templateUrl=routeConfig.getViewsDirectory()+baseName+'.html';
				routeDef.controller=baseName+'Ctrl';
				routeDef.resolve={
					load:['$q','$rootScope',function($q,$rootScope){
						var dependencies=[routeConfig.getControllersDirectory()+baseName+'Ctrl.js'];
						return resolveDependencies($q,$rootScope,dependencies);
					}]
				};
				$.extend(routeDef.resolve,deferred);
				return routeDef;
			};
			var resolveDependencies=function($q,$rootScope,dependencies){
				var defer = $q.defer();
				require(dependencies,function(){
					defer.resolve();
					$rootScope.$apply();
				});
				return defer.promise;
			};
			return {resolve:resolve}
		}(this.routeConfig);
	});
});