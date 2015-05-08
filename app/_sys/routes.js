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
		.state('layout.about', {
			url: '/about',
			templateUrl: 'about'
		})
		.state('layout.contact', {
			url: '/contact',
			templateUrl: 'contact',
			controller: 'contact'
		})

});

app.config(function(apiProvider){
	apiProvider.provideApis([
		"users",
		"contacts"
	])
})

app.config(function($mdThemingProvider, $mdIconProvider){
	$mdThemingProvider
		.theme('default')
		.primaryPalette('amber')
		.accentPalette('blue')
});

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
