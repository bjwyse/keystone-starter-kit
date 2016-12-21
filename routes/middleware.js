var _ = require('lodash');

exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length }) ? flashMessages : false;
	next();
};

exports.initLocals = function(req, res, next) {

    var locals = res.locals;

    locals.user = req.user;

    locals.page = {
        path: req.url.split("?")[0]
    };

    next();
};


/**
 Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/signin');
    } else {
        next();
    }
};