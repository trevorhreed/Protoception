app.controller('layout', function($scope, $location, $mdSidenav, $mdMedia, auth){

	$scope.user = auth.user();

	$scope.$watch(function(){ return $mdMedia('gt-md'); }, function(bigScreen){
		$scope.bigScreen = bigScreen;
	});

	$scope.logout = function(){
		auth.unauth();
	}

	$scope.goTo = function(path){
		$location.path(path);
		$mdSidenav('left').close();
	}

	$scope.openNav = function(){
		$mdSidenav('left').toggle();
	}
});
