/*!
 * foobar controller
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/13
 * since: 0.0.1
 */
'use strict';

module.exports = {

	middlewares: {
		all: [
			(req, res, next) => {
				console.log('foobar middleware 1');
				next();
			},
			(req, res, next) => {
				console.log('foobar middleware 2');
				next();
			},
		],
		list: [
			(req, res, next) => {
				console.log('foobar list middleware 1');
				next();
			},
			(req, res, next) => {
				console.log('foobar list middleware 2');
				next();
			},
		],
	},

	index(req, res, next) {
		res.send('GET: /foobar');
	},

	list(req, res, next) {
		res.send('GET: /foobar/list');
	},

};
