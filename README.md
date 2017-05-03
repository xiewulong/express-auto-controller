# Express auto controller

Express自动路由模块

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

基于express封装一层路由控制 解决以下几个问题

* express的路由定义太自由 真正项目工程开发中 最好还是需要有一定的约束性规范 以便更好协作和维护
* express增加路由需要修改程序和文件两处 如果只增加文件 而不用再在程序逻辑中重复定义的话 效率会提升很多 程序也不会随着项目规模越来越大而越来越臃肿

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
