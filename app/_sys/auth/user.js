app.factory('user', function($cookies){

	function _get(){
		return $cookies._jeopardy_user;

	}
	function _set(user){
		$cookies._jeopardy_user = user
	}
	function _clear(){
		$cookies._jeopardy_user = null;
	}

	return {
		get: _get,
		set: _set,
		clear: _clear
	}
});
