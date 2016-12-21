var keystone = require('keystone');

require('dotenv').config({ silent: true });

keystone.init({

	'name': 'Keystone Starter Kit',
	'brand': 'Demo',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',
	'admin path': 'admin',

	'views': 'templates/views',
	'view engine': 'pug',

    'emails': 'templates/emails',
	'email transport': 'mailgun',
    'contactEmailAddress': 'contact@keystone-starter-kit.com',

	'auto update': true,
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/keystone-starter-kit',
	'cloudinary config': process.env.CLOUDINARY_URL || 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN

});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('hostName',
    (function() {
        if (keystone.get('env') === 'staging') return 'http://beta.keystone-starter-kit.com';
        if (keystone.get('env') === 'production') return 'http://www.keystone-starter-kit.com';
        return 'http://localhost:' + (keystone.get('port') || '3000');
    })()
);

keystone.set('nav', {
	'posts': ['posts', 'post-comments', 'post-categories'],
	'users': 'users'
});

keystone.start();
