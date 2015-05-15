app.constant('sitemap', [
	{ simple: 'login', url: '/login' },
	{ simple: 'layout', url: '/', abstract: true, children: [
		{ simple: 'home', url: '' },
		{ simple: 'about', noController: true },
		{ simple: 'contact' },
		{ simple: 'people', children: [
			{ sub: 'edit', url: '/edit/:key?' }
		]}
	]}
]);
