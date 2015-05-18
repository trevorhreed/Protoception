app.constant('sitemap', [
	{ simple: 'login', url: '/login' },
	{ simple: 'layout', url: '/', abstract: true, children: [
		{ simple: 'home', url: '' },
		{ simple: 'mine' },
		{ simple: 'theirs' },
		{ simple: 'create' },
		{ simple: 'people', children: [
			{ sub: 'edit', url: '/edit/:key?' }
		]}
	]}
]);
