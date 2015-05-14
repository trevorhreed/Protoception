app.run(function($rootScope, $location, auth){
	$rootScope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){

		if($location.search()['signmeout']){
			auth.unauth();
		}

		if(!auth.isauthed()){
			$location.path('/login');
		}

	});
});
