/*!
 * user controller
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/12
 * since: 0.0.1
 */
'use strict';

module.exports = {

	listPath: '/all',

	middlewares: {
		all: [
			(req, res, next) => {
				console.log('user middleware 1');
				next();
			},
			(req, res, next) => {
				console.log('user middleware 2');
				next();
			},
		],
		list: [
			(req, res, next) => {
				console.log('user list middleware 1');
				next();
			},
			(req, res, next) => {
				console.log('user list middleware 2');
				next();
			},
		],
	},

	index(req, res, next) {
		res.send('GET: /user');
	},

	list(req, res, next) {
		res.send('GET: /user/all');
	},

	show(req, res, next) {
		res.send('GET: /user/:id');
	},

	new(req, res, next) {
		res.send('GET: /user/new');
	},

	create(req, res, next) {
		res.send('POST: /user');
	},

	edit(req, res, next) {
		res.send('GET: /user/:id/edit');
	},

	update(req, res, next) {
		res.send('PUT|POST: /user/:id');
	},

	patch(req, res, next) {
		res.send('PATCH: /user/:id | POST: /user/:id/patch');
	},

	delete(req, res, next) {
		res.send('DELETE: /user/:id | POST: /user/:id/delete');
	},

};
