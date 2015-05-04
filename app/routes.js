app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
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
