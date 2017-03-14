/*!
 * foo controller
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/13
 * since: 0.0.1
 */
module.exports = {

	disabled: true,

	index(req, res, next) {
		res.send('GET: /foobar/baz/foo');
	},

};
