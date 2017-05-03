/*!
 * express auto controller
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/12
 * since: 0.0.1
 */
'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');

const actions = {
	index: {
		method: 'get',
		path: '/',
	},
	list: {
		method: 'get',
		path: '/list',
	},
	show: {
		method: 'get',
		path: '/:id',
	},
	new: {
		method: 'get',
		path: '/new',
	},
	create: {
		method: 'post',
		path: '/',
	},
	edit: {
		method: 'get',
		path: '/:id/edit',
	},
	update: {
		method: 'put',
		path: '/:id',
		post: '',
	},
	patch: {
		method: 'patch',
		path: '/:id',
		post: '/patch',
	},
	destroy: {
		method: 'delete',
		path: '/:id',
		post: '/destroy',
	},
};

const removeExtraBackslash = (str) => {
	if(str[1] == '/') {
		str = str.slice(1);
	}
	if(str[str.length - 1] == '/') {
		str = str.slice(0, -1);
	}

	return str || '/';
};

const createControllerId = (action, paths = []) => {
	return [action].concat(paths).join('_');
};

class AutoController {

	constructor(dir, app, options = {}) {
		if(!dir || !app) {
			console.error('dir and app are required');
			return;
		}

		this.options = Object.assign({
			extensions: ['.js'],
			index: 'index',
			list: '',
			post: false,
		}, options);

		this.dir = dir;
		this.app = app;
		this.controllers = {};

		this.recurse();
	}

	recurse(parents = []) {
		let dir = path.join.apply(null, [this.dir].concat(parents));
		let dirs = [];
		let files = [];

		fs.readdirSync(dir).forEach((file) => {
			let _file = path.join(dir, file);
			let stat = fs.statSync(_file);

			if(!stat) {
				return;
			} else if(stat.isDirectory()) {
				dirs.push(file);
			} else if(stat.isFile()) {
				files[path.basename(file, path.extname(file)) == this.options.index ? 'unshift' : 'push'](_file);
			}
		});

		files.forEach((file) => {
			let ext = path.extname(file);
			this.options.extensions.indexOf(ext) >= 0 && this.controller(file, path.basename(file, ext), parents);
		});

		dirs.forEach((dir) => {
			let parentRoute = this.controllers[createControllerId('index', parents)] || '/';

			this.controllers[createControllerId('index', parents.concat(dir))] = removeExtraBackslash(parentRoute + '/' + dir);
			this.recurse(parents.concat(dir));
		});
	}

	controller(file, name, parents) {
		let controller = require(file);
		let {
			listPath = this.options.list,
			parent = 'index',
			middlewares = {},
			disabled = false,
		} = controller;

		if(disabled) {
			return;
		}

		let _parents = parents.slice(0);
		let parentRoute = this.controllers[createControllerId(parent, parents)] || '/';
		if(name != this.options.index) {
			_parents.push(name);
			parentRoute += (parentRoute == '/' ? '' : '/') + name;
		}

		let router = express.Router();
		middlewares.all && router.use(middlewares.all);
		Object.keys(actions).forEach((action) => {
			let {method, path, post} = actions[action];
			let callback = controller[action];
			if(!callback) {
				this.controllers[createControllerId(action, _parents)] = removeExtraBackslash(parentRoute + path);
				return;
			}

			if(action == 'list' && listPath) {
				path = listPath;
			}
			if(post) {
				method = 'post';
				path += post;
			}

			middlewares[action] && router.use(path, middlewares[action]);
			router[method](path, callback);
			this.controllers[createControllerId(action, _parents)] = removeExtraBackslash(parentRoute + path);
		});

		this.app.use(parentRoute, router);
	}

}

express.application.autoController = function(dir, options = {}) {
	new AutoController(dir, this, options);
};

module.exports = AutoController;
