/*!
 * foo controller
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/13
 * since: 0.0.1
 */
'use strict';

module.exports = {

	index(req, res, next) {
		res.send('GET: /foobar/qux/foo');
	},

};
