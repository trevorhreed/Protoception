app.controller('contact', function($scope, $http){
	$scope.contact = {};

	function getDb(){
		$http
			.get("/data/contacts")
			.success(function(data){
				$scope.data = data;
			});
	}
	getDb();

	$scope.save = function(){
		$http
			.post("/data/contacts", $scope.contact)
			.success(function(data){
				getDb();
			});
	}
});
