app.controller('contact', function($scope, $http, contactsApi){
	$scope.contact = {};
	$scope.contactsApi = contactsApi;
	contactsApi.refresh();

	$scope.edit = function(contact){
		$scope.contact = angular.copy(contact);
	}
	$scope.save = function(){
		contactsApi.put($scope.contact);
		$scope.contact = {};
	}
});
