# Express auto controller

Express自动路由控制器模块

## 目录

<details>

* [安装](#安装)
* [介绍](#介绍)
* [使用](#使用)
* [License](#license)

</details>

## 安装

```bash
$ npm i [-S] express-auto-controller
```

## 介绍

基于express定义controller

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

## License

MIT - [xiewulong](https://github.com/xiewulong)
