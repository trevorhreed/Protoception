app.controller('login', function($scope, $location, $mdToast, auth){
	$scope.login = function(){
		auth.auth($scope.user).then(function(){
			$location.path('/');
		}, function(err){
			$mdToast.show(
				$mdToast.simple().content(err.msg)
			);
		});
	}
});
