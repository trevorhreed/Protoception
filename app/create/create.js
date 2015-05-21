app.controller('create', function($scope, eventsApi){
	$scope.test = 'Create.';

	$scope.save = function(){
		$scope.event.mine = true;
		eventsApi.put($scope.event);
		$scope.event = {};
	}

	$scope.cancel = function(){
		$scope.event = {};
	}

})
