var keystone = require('keystone');
var Types = keystone.Field.Types;

var User = new keystone.List('User', {});

var deps = {
    mentoring: { 'mentoring.available': true },

    github: { 'services.github.isConfigured': true },
    facebook: { 'services.facebook.isConfigured': true },
    google: { 'services.google.isConfigured': true },
    twitter: { 'services.twitter.isConfigured': true }
};

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	phone: { type: String, width: 'short' },
	photo: { type: Types.CloudinaryImage, collapse: true },
	password: { type: Types.Password, initial: true, required: false },
    resetPasswordKey: { type: String, hidden: true }
}, 'Services', {
        services: {
            github: {
                isConfigured: { type: Boolean, label: 'GitHub has been authenticated' },

                profileId: { type: String, label: 'Profile ID', dependsOn: deps.github },

                username: { type: String, label: 'Username', dependsOn: deps.github },
                avatar: { type: String, label: 'Image', dependsOn: deps.github },

                accessToken: { type: String, label: 'Access Token', dependsOn: deps.github },
                refreshToken: { type: String, label: 'Refresh Token', dependsOn: deps.github }
            },
            facebook: {
                isConfigured: { type: Boolean, label: 'Facebook has been authenticated' },

                profileId: { type: String, label: 'Profile ID', dependsOn: deps.facebook },

                username: { type: String, label: 'Username', dependsOn: deps.facebook },
                avatar: { type: String, label: 'Image', dependsOn: deps.facebook },

                accessToken: { type: String, label: 'Access Token', dependsOn: deps.facebook },
                refreshToken: { type: String, label: 'Refresh Token', dependsOn: deps.facebook }
            },
            google: {
                isConfigured: { type: Boolean, label: 'Google has been authenticated' },

                profileId: { type: String, label: 'Profile ID', dependsOn: deps.google },

                username: { type: String, label: 'Username', dependsOn: deps.google },
                avatar: { type: String, label: 'Image', dependsOn: deps.google },

                accessToken: { type: String, label: 'Access Token', dependsOn: deps.google },
                refreshToken: { type: String, label: 'Refresh Token', dependsOn: deps.google }
            },
            twitter: {
                isConfigured: { type: Boolean, label: 'Twitter has been authenticated' },

                profileId: { type: String, label: 'Profile ID', dependsOn: deps.twitter },

                username: { type: String, label: 'Username', dependsOn: deps.twitter },
                avatar: { type: String, label: 'Image', dependsOn: deps.twitter },

                accessToken: { type: String, label: 'Access Token', dependsOn: deps.twitter },
                refreshToken: { type: String, label: 'Refresh Token', dependsOn: deps.twitter }
            }
        }
    }
);

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.schema.methods.wasActive = function () {
	this.lastActiveOn = new Date();
	return this;
};

User.schema.methods.resetPassword = function(callback) {
    var user = this;
    user.resetPasswordKey = keystone.utils.randomString([16,24]);
    user.save(function(err) {
        if (err) return callback(err);
        new keystone.Email('forgotten-password').send({
            siteName: keystone.get('name'),
            host: keystone.get('hostName'),
            user: user,
            link: '/reset-password/' + user.resetPasswordKey,
            subject: 'Reset your ' + keystone.get('name') + ' Password',
            to: user.email,
            from: {
                name: keystone.get('name'),
                email: keystone.get('contactEmailAddress')
            }
        }, callback);
    });
};

User.track = true;
User.defaultColumns = 'name, email, phone, photo';
User.register();
