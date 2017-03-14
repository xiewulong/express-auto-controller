/*!
 * user controller
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/12
 * since: 0.0.1
 */
module.exports = {

	listPath: '/all',

	middlewares: {
		all: [
			(req, res, next) => {
				console.dir('user middleware 1');
				next();
			},
			(req, res, next) => {
				console.dir('user middleware 2');
				next();
			},
		],
		list: [
			(req, res, next) => {
				console.dir('user list middleware 1');
				next();
			},
			(req, res, next) => {
				console.dir('user list middleware 2');
				next();
			},
		],
	},

	index(req, res, next) {
		res.send('GET: /user');
	},

	list(req, res, next) {
		res.send('GET: /users');
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

	patch() {
		res.send('PATCH: /user/:id | PATCH: /user/:id/patch');
	},

	destroy(req, res, next) {
		res.send('DELETE: /user/:id | POST: /user/:id/destroy');
	},

};
