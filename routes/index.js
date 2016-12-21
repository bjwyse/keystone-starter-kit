const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.siteName = keystone.get('name');
    res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' }
	];
	res.locals.user = req.user;

	next();
});

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	views: importRoutes('./views'),
    auth: importRoutes('./auth')
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);

    // Session
    app.all('/join', routes.views.session.join);
    app.all('/signin', routes.views.session.signin);
    app.get('/signout', routes.views.session.signout);
    app.all('/forgot-password', routes.views.session['forgot-password']);
    app.all('/reset-password/:key', routes.views.session['reset-password']);

    // Authentication
    app.all('/auth/confirm', routes.auth.confirm);
    app.all('/auth/app', routes.auth.app);
    app.all('/auth/:service', routes.auth.service);

	// User Profile
    app.all('/profile*', middleware.requireUser);
    app.all('/profile', routes.views.profile);
};
