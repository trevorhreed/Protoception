app.controller('layout', function($scope, $location, $mdSidenav, $mdMedia){

	$scope.$watch(function(){ return $mdMedia('gt-md'); }, function(bigScreen){
		$scope.bigScreen = bigScreen;
	});

	$scope.goTo = function(path){
		$location.path(path);
		$mdSidenav('left').close();
	}

	$scope.openNav = function(){
		$mdSidenav('left').toggle();
	}
});
