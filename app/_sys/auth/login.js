app.controller('login', function($scope, $location, user, usersApi){

	usersApi.refresh();
	$scope.usersApi = usersApi;

	$scope.add = function(){
		var name = prompt("Please enter a name:");
		if(name){
			usersApi.put({"name": name});
		}
	}

	$scope.remove = function(){
		if(confirm("Are you sure you want to delete this user?")){
			usersApi.del($scope.user);
		}
	}

	$scope.login = function(){
		if($scope.createNewUser){
			usersApi.put({
				"name": $scope.newUser
			});
			user.set($scope.newUser);
		}else{
			user.set($scope.user);
		}
		$location.path("/");
	}

});
