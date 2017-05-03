# Express auto controller

Express自动路由模块

## 目录

<details>

* [介绍](#介绍)
* [安装](#安装)
* [使用](#使用)
* [License](#license)

</details>

## 介绍

基于express封装一层路由控制 解决以下问题

* express的路由定义太自由 真正项目开发中 最好还是需要有一定的约束性规范 以便更好协作和维护
* express路由的管理需要修改程序和文件两处 如果只增加文件 而不用再在程序逻辑中重复定义的话 效率会提升很多 程序也不会随着项目规模越来越大而越来越臃肿

## 安装

```bash
$ npm i [-S] express-auto-controller
```

## 使用

```js
// app.js
const express = require('express');
require('express-auto-controller');

const app = express();

// 定义所有controller存放目录
app.autoController(path.join(__dirname, 'controllers'));

app.listen(3000);
```

## 创建路由

```js
// controllers/index.js
module.exports = {

	index(req, res, next) {
		res.send('GET: /');
	},

};
```

```js
// controllers/index.js
module.exports = {

	index(req, res, next) {
		res.send('GET: /');
	},

};
```

```js
// controllers/user.js
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
```

```js
// controllers/foobar/index.js
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
```

```js
// controllers/foobar/foo.js
module.exports = {

	parent: 'list',

	index(req, res, next) {
		res.send('GET: /foobar/list/foo');
	},

};
```

```js
// controllers/foobar/bar.js
module.exports = {

	parent: 'show',

	index(req, res, next) {
		res.send('GET: /foobar/:id/bar');
	},

};
```

```bash
$ node app.js

# curl -X GET localhost:3000 -> GET: /
GET / 200 1.859 ms - 6

# curl -X GET localhost:3000/user -> GET: /user
user middleware 1
user middleware 2
GET /user 200 12.636 ms - 10

# curl -X GET localhost:3000/user/all -> GET: /user/all
user middleware 1
user middleware 2
user list middleware 1
user list middleware 2
GET /user/all 200 1.662 ms - 14

# curl -X POST -d "{name: 'xiewulong'}" leoxs.com:3000/user -> POST: /user
user middleware 1
user middleware 2
POST /user 200 0.753 ms - 11

# curl -X PUT -d "{name: 'xiewulong'}" leoxs.com:3000/user/1 -> PUT|POST: /user/:id
user middleware 1
user middleware 2
PUT /user/1 200 1.558 ms - 19

# curl -X POST -d "{name: 'xiewulong'}" leoxs.com:3000/user/1 -> PUT|POST: /user/:id
user middleware 1
user middleware 2
POST /user/1 200 1.812 ms - 19

# curl -X PATCH -d "{name: 'xiewulong'}" leoxs.com:3000/user/1 -> PATCH: /user/:id | POST: /user/:id/patch
user middleware 1
user middleware 2
PATCH /user/1 200 1.920 ms - 40

# curl -X POST -d "{name: 'xiewulong'}" leoxs.com:3000/user/1/patch -> PATCH: /user/:id | POST: /user/:id/patch
user middleware 1
user middleware 2
POST /user/1/patch 200 1.445 ms - 40

# curl -X DELETE -d "{id: 1}" leoxs.com:3000/user/1 -> DELETE: /user/:id | POST: /user/:id/delete
user middleware 1
user middleware 2
DELETE /user/1 200 0.909 ms - 43

# curl -X POST -d "{id: 1}" leoxs.com:3000/user/1/delete -> DELETE: /user/:id | POST: /user/:id/delete
user middleware 1
user middleware 2
POST /user/1/delete 200 0.767 ms - 43

# curl -X POST -d "{name: 'xiewulong'}" leoxs.com:3000/user/1/patch -> PATCH: /user/:id | POST: /user/:id/patch
user middleware 1
user middleware 2
POST /user/1/patch 200 1.445 ms - 40

# curl -X GET localhost:3000/foobar -> GET: /foobar
foobar middleware 1
foobar middleware 2
GET /foobar 200 1.187 ms - 12

# curl -X GET localhost:3000/foobar/list/foo -> GET: /foobar/list/foo
foobar middleware 1
foobar middleware 2
foobar list middleware 1
foobar list middleware 2
GET /foobar/list/foo 200 1.426 ms - 21

# curl -X GET localhost:3000/foobar/1/bar -> GET: /foobar/:id/bar
foobar middleware 1
foobar middleware 2
GET /foobar/1/bar 200 2.252 ms - 20
```

## License

MIT - [xiewulong](https://github.com/xiewulong)
