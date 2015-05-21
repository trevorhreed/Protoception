app.controller('mine', function($scope, eventsApi){
	$scope.test = 'My events.';
	$scope.eventsApi = eventsApi;
	eventsApi.refresh();
})
