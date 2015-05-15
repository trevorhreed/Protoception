app.controller('people', function($rootScope, $scope, $state, usersApi){
	$rootScope.title = "People";
	$scope.$state = $state;
	$scope.usersApi = usersApi;
	usersApi.refresh();
});
