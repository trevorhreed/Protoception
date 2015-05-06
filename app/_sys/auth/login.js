app.controller('login', function($scope, $location, auth){
	$scope.login = function(){
		console.log('authenticating...');
		auth.auth($scope.user).then(function(){
			console.log('redirecting...');
			$location.path('/');
		}, function(err){
			console.dir(err);
		});
	}
});
