app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login',
			controller: 'login'
		})
		.state('layout', {
			templateUrl: 'layout',
			controller: 'layout'
		})
		.state('layout.home', {
			url: '/',
			templateUrl: 'home',
			controller: 'home'
		})
	;

});

app.config(function(apiProvider){
	apiProvider.provideApis([
		"users"
	])
})

app.config(function($mdThemingProvider, $mdIconProvider){
	$mdThemingProvider
		.theme('default')
		.primaryPalette('amber')
		.accentPalette('blue')
});

app.run(function($rootScope, $location, user){
	$rootScope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){

		if($location.search()['signmeout']){
			user.clear();
		}

		if(user.get() == null){
			$location.path('/login');
		}

	});
});
