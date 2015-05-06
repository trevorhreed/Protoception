app.directive('setFocus', function(){
	return {
		link: function(scope, element, attrs){
			element.focus();
		}
	}
})
