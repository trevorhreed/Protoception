app.controller('peopleEdit', function($scope, $state, $stateParams, usersApi){
	$scope.key = $stateParams.key;

	if($scope.key){
		usersApi.get($scope.key).success(function(person){
			$scope.person = person;
		})
	}

	$scope.save = function(){
		usersApi.put($scope.person);
		$state.go('^');
	}
	$scope.cancel = function(){
		$state.go('^');
	}
	$scope.remove = function(){
		if(confirm("Are you sure you want to delete this person?")){
			usersApi.del($scope.person).success(function(){
				$state.go('^');
			})
		}
	}
});
