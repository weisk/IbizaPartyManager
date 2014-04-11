'use strict';

define(['app'], function(app) {

	app.register.controller('HomeCtrl',['$scope','$rootScope','config','Api','$modal','$route',
		function($scope,$rootScope,config,Api,$modal,$route) {

			$rootScope.title = 'Home';

			$scope.selectedParty = null;
			$scope.partyData = null;

			$scope.getParties = function() {
				Api.parties()
					.success(function(data,status,headers,config) {
						$scope.parties = data;
						$scope.changeParty($scope.parties[0].id)
					})
					.error(function(data,status,headers,config) {
						alert('some error happened...');
					});
			}

			$scope.changeParty = function(id) {
				$scope.selectedParty = id;
				$rootScope.selectedParty = id;
				Api.partyinfo(id)
					.success(function(data,status,headers,config) {
						$scope.partyData = data[0];
						$scope.attendants = data['attendants'];
					})
					.error(function(data,status,headers,config) {
						alert('some error happened...');
					});
			}

			var ModalCtrl = function($scope,$modalInstance,id,$rootScope,Api){ 

				$scope.join = function() {
					var params = 'name='+this.newatt.name+'&email='+this.newatt.email;
					var that = this;
					Api.join(id,params)
						.success(function(data,status,headers,config) {
							if(data === true || data === "true") {
								alert('You joined the party!');
								that.close();
							} else {
								alert('Error!');
							}
						})
						.error(function(data,status,headers,config) {
							alert('Error!');
						});
				}

				$scope.close = function(){
					$modalInstance.close();
				}
			} 

			$scope.join = function() {
				var modalI = $modal.open({ 
					templateUrl: 'views/modal/join.html',
					controller: ModalCtrl,
					resolve: {
						id: function() { return $scope.selectedParty },
					}
				});
				modalI.result.then(function(){
					$route.reload();
				}, function(){
					$route.reload();				
				})
			}
			
			var _init = function() {
				$scope.getParties();
			}
			_init();
		}
	]);
});