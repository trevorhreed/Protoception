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

app.controller('home', function($scope){
	$scope.test = "home-test";
});

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

angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("layout","<nav>\n	<ul>\n		<li><a href=\"#/\">Home</a></li>\n		<li><a href=\"#/about\">About</a></li>\n		<li><a href=\"#/contact\">Contact</a></li>\n	</ul>\n</nav>\n<main ui-view></main>\n");
$templateCache.put("about","<h1>About</h1>\n<p>This website showcases the functionality available in the Protoception project.</p>\n");
$templateCache.put("home","<h1>Home</h1>\n<p>Welcome to this example SPA application!</p>\n");
$templateCache.put("contact","<h1>Contact Us</h1>\n<form novalidate>\n	<div class=\"form-group\">\n		<label for=\"txtName\">Name</label>\n		<input class=\"form-control\" id=\"txtName\" ng-model=\"contact.name\" />\n	</div>\n	<div class=\"form-group\">\n		<label for=\"txtName\">Email Address</label>\n		<input type=\"email\" class=\"form-control\" id=\"txtEmail\" ng-model=\"contact.email\" />\n	</div>\n	<div class=\"form-group\">\n		<label for=\"txtName\">Message</label>\n		<textarea class=\"form-control\" id=\"txtMessage\" ng-model=\"contact.message\"></textarea>\n	</div>\n	<div class=\"form-group\">\n		<label>\n			<input type=\"checkbox\" ng-model=\"contact.allowContact\" /> Allow us to contact you regarding your feedback?\n		</label>\n	</div>\n\n	<button type=\"submit\" class=\"btn btn-primary\" ng-click=\"save()\">Send</button>\n</form>\n\n<div class=\"data\">\n	<h3>Contacts</h3>\n	<pre class=\"code\">{{data | json}}</pre>\n</div>\n");}]);