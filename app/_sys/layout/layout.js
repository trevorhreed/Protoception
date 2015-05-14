app.controller('layout', function($scope, $state, $mdSidenav, $mdMedia, auth, navigation){

	$scope.navigation = navigation;
	//$scope.$state = $state;

	$scope.user = auth.user();

	$scope.$watch(function(){ return $mdMedia('gt-md'); }, function(bigScreen){
		$scope.bigScreen = bigScreen;
	});

	$scope.go = function(state){
		$mdSidenav('left').close();
		$state.go(state);
	}

	$scope.logout = function(){
		auth.unauth();
	}

	$scope.openNav = function(){
		$mdSidenav('left').toggle();
	}
});
