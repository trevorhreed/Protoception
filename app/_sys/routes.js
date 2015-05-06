app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login',
			controller: 'login'
		})
		.state('layout', {
			templateUrl: 'layout'
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

app.run(function($rootScope, $location, auth){
	$rootScope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){

		if($location.search()['signmeout']){
			auth.unauth();
		}

		if(!auth.isauthed()){
			console.log('User not authorized');
			$location.path('/login');
		}

	});
});
