var keystone = require('keystone');

var users = require('./fixtures/users.json');
var posts = require('./fixtures/posts.json');
var comments = require('./fixtures/comments.json');

exports.create = {
    User: users,
	Post: posts,
    PostComment: comments
};