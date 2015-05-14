app.constant('sitemap', [
	{ simple: 'login' },
	{ simple: 'layout', url: '/', children: [
		{ simple: 'home', url: '', nav: ["Home", "", "01", "01"] },
		{ simple: 'about', noController: true, nav: "About" },
		{ simple: 'contact', nav: "Contact" },
		{ simple: 'people', nav: ["People", "Admin"], children: [
			{ simple: 'edit', templateUrl: 'people-edit' }
		]}
	]}
]);

app.config(function($provide, $stateProvider, $urlRouterProvider, sitemap){
	$urlRouterProvider.otherwise('/');
	var navigation = [];
	var addNavigation = (function(){
		var index = {};
		return function(state){
			var section = angular.isArray(state.nav) ? state.nav[1] || "" : "",
					sectionSort = angular.isArray(state.nav) ? state.nav[3] || state.nav[1] || "" : "",
					label = angular.isArray(state.nav) ? state.nav[0] : state.nav,
					labelSort = angular.isArray(state.nav) ? state.nav[2] || state.nav : state.nav
			if(!index[section]){
				index[section] = [];
				navigation.push({
					heading: section,
					sort: sectionSort,
					items: index[section]
				});
			}
			index[section].push({
				label: label,
				sort: labelSort,
				state: state.name
			})
		}
	})();
	var addStates = function(statemap, ancestors, parentUrl){
		for(var i in statemap){
			var state = statemap[i];
			if(state.simple){
				state.id = state.id || state.simple;
				state.url = state.url || state.simple;
				state.noTemplate || (state.templateUrl = state.templateUrl || state.simple);
				state.noController || (state.controller = state.controller || state.simple);
			}
			var key = ancestors ? ancestors + "." + state.id : state.id;
			$stateProvider.state(key, state);
			if(state.nav){
				addNavigation(state);
			}
			if(state.children){
				addStates(state.children, key);
			}
		}
	}
	addStates(sitemap);
	$provide.constant('navigation', navigation);
	console.dir(navigation);
});
