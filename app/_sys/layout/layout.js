app.controller('layout', function($scope, $location, $mdSidenav, $mdMedia, user){

	$scope.user = user.get();

	$scope.$watch(function(){ return $mdMedia('gt-md'); }, function(bigScreen){
		$scope.bigScreen = bigScreen;
	});

	$scope.logout = function(){
		user.clear();
		$location.path('/login');
	}

	$scope.goTo = function(path){
		$location.path(path);
		$mdSidenav('left').close();
	}

	$scope.openNav = function(){
		$mdSidenav('left').toggle();
	}
});
