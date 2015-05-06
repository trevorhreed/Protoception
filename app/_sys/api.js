app.provider('api', function($provide){

	var _collections = [],
			_apiPrefix = '/data/';

	function updateItem(collectionApi, item){
		for(var i=0; i < collectionApi.items.length; i++){
			if(collectionApi.items[i].$key == item.$key){
				collectionApi.items[i] = item;
				return;
			}
		}
	}
	function addItem(collectionApi, item){
		collectionApi.items.push(item);
	}
	function removeItem(collectionApi, item){
		collectionApi.items.splice(collectionApi.items.indexOf(item), 1);
	}

	function getCollectionApi(collection, $http){
		var collectionApi = {
			items: [],
			refresh: function(){
				return collectionApi.all();
			},
			all: function(){
				return $http
					.get(_apiPrefix + collection)
					.success(function(items){
						collectionApi.items = [];
						for(var k in items){
							collectionApi.items.push(items[k]);
						}
					});
			},
			get: function(key){
				if(!key) return;
				return $http
					.get(_apiPrefix + collection + '/' + key)
					.success(function(item){
						updateItem(collectionApi, item);
					});
			},
			put: function(entity){
				if(entity.$key){
					return $http
						.put(_apiPrefix + collection + '/' + entity.$key, entity)
						.success(function(item){
							updateItem(collectionApi, item);
						});
				}else{
					return $http.post(_apiPrefix + collection, entity).success(function(item){
						addItem(collectionApi, item);
					});
				}
			},
			del: function(keyOrEntity){
				if(!keyOrEntity) return;
				var key = keyOrEntity.$key ? keyOrEntity.$key : keyOrEntity;
				return $http
					.delete(_apiPrefix + collection + '/' + key)
					.success(function(item){
						removeItem(collectionApi, item);
					})
			}
		};
		return collectionApi;
	}

	function _getApiFactory($http){
		return function(collection){
			if(_collections[collection] == null){
				_collections[collection] = getCollectionApi(collection, $http);
			}
			return _collections[collection];
		}
	}

	this.provideApis = function(apis){
		if(angular.isString(apis)){
			_collections = [apis];
		}else if(angular.isArray(apis)){
			_collections = apis;
		}

		angular.forEach(_collections, function(collection, index){
			$provide.factory(collection + 'Api', function($http){
				return _getApiFactory($http)(collection);
			});
		});

	}

	this.$get = function($http, $injector){
		return _getApiFactory($http);
	}

});
