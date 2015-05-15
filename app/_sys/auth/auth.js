app.factory('auth', function($rootScope, $http, $q, $location){
	var _user,
			_defaultAdmin = {
				'name': 'admin',
				'roles': ['admin']
			},
			failureMessages ={
				'empty': 'Username and password are required',
				'invalid': 'Invalid credentials',
				'http': 'Server error during authentication'
			}
	;

	function _failure(deferred, type, data){
		_user = null;
		deferred.reject({
			'type': type,
			'msg': failureMessages[type],
			'data': data
		})
	}

	function user(){
		return _user;
	}
	function isauthed(){
		if(!_user){
			_user = _defaultAdmin;
		}
		return !!_user;
	}
	function auth(user){
		var deferred = $q.defer();
		if(!user || !user.name || !user.pass){
			_failure(deferred, 'empty', user);
		}else{
			$http
				.get('/data/users/' + name)
				.success(function(data){
					if(
						data && data.name &&
						data.pass
						&& user.name == data.name
						&& user.pass == data.pass){
							$rootScope.user = _user = data;
							deferred.resolve(data)
					}else if(user.name == 'admin' && user.pass == '123'){
						$rootScope.user = _user = _defaultAdmin;
						console.dir($rootScope.user);
						deferred.resolve(_defaultAdmin);
					}else{
						_failure(deferred, 'invalid', user);
					}
				})
				.error(function(data){
					_failure(deferred, 'http', user);
				});
		}
		return deferred.promise;
	}
	function unauth(){
		_user = null;
		$location.path('/login');
	}

	return {
		isauthed: isauthed,
		auth: auth,
		unauth: unauth,
		user: user
	}
});
