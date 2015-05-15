app.config(function(apiProvider){
	apiProvider.provideApis([
		"users",
		"contacts"
	]);

	/*
		Each entry in the array passed to apiProvider.provideApis
		produces an injectable api with the name ENTRYApi (i.e.
		passing in "users" produces an injectable api named
		usersApi). Each api has the following members:

			items[] <- a collection that stays up-to-date
			all() -> $httpPromise
			get(key) -> $httpPromise
			put(entity) -> $httpPromise
			del(keyOrEntity) -> $httpPromise

	 */
})
