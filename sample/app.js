/*!
 * express auto controller sample
 * xiewulong <xiewulong@vip.qq.com>
 * create: 2017/03/12
 * since: 0.0.1
 */
'use strict';

const path = require('path');
const express = require('express');
const logger = require('morgan');

require('../');

const app = express();

app.use(logger('dev'));

app.autoController(path.join(__dirname, 'controllers'));

app.use(function(req, res, next) {
  res.status(404).send('404');
});

app.listen(3000);
