app.factory('auth', function($http, $q){
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
		return !!_user;
	}
	function auth(user){
		var deferred = $q.defer();
		if(!user || !user.name || !user.pass){
			_failure(deferred, 'empty', user);
		}else if(user.name == 'admin'){
			_user = _defaultAdmin;
			deferred.resolve(_defaultAdmin);
		}else{
			$http
				.get('/data/users/' + name)
				.success(function(data){
					if(
						data && data.name &&
						data.pass
						&& user.name == data.name
						&& user.pass == data.pass){
							_user = data;
							console.dir(_user);
							deferred.resolve(data)
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
		user = null;
	}

	return {
		isauthed: isauthed,
		auth: auth,
		unauth: unauth,
		user: user
	}
});
