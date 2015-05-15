app.config(function($provide, $stateProvider, $urlRouterProvider, sitemap){
	$urlRouterProvider.otherwise('/');
	var addStates = function(statemap, ancestors, parent){
		parent = parent || {};
		for(var i in statemap){
			var state = statemap[i];
			if(state.simple){
				var name = state.simple;
				state.id = state.id || name;
				state.url = state.url != undefined ? state.url : name;
				if(!state.noTemplate){
					state.templateUrl = state.templateUrl != undefined ? state.templateUrl : name;
				}
				if(!state.noController){
					state.controller = state.controller != undefined ? state.controller : name;
				}
			}else if(state.sub){
				var name = state.sub;
				state.id = state.id || name;
				state.url = state.url || '/' + name;
				state.templateUrl = state.templateUrl || parent.templateUrl + '-' + name;
				state.controller = state.controller || parent.controller + name.charAt(0).toUpperCase() + name.slice(1);
			}
			var key = ancestors ? ancestors + "." + state.id : state.id;
			$stateProvider.state(key, state);
			if(state.children){
				addStates(state.children, key, state);
			}
		}
	}
	addStates(sitemap);
});
