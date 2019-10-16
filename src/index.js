
const Koa = require('koa');
const routers = require('./routers');
const CONFIG = require('./config');
const path = require('path');
const bodyParser = require('koa-bodyparser');


const app = new Koa();


app.util = {
  lodash: require('lodash'),
  bluebird: require('bluebird'),
  moment: require('moment')
}

app.use(require('koa-helmet')())
app.use(require('@koa/cors')())
app.use(require('koa-logger')())

app.use(require('koa-res')({
  debug: process.env.NODE_ENV !== 'production'
}))

app.use(bodyParser({
  enableTypes: ['json'],
  extendTypes: ['application/json'],
  onerror: function (err, ctx) {
    ctx.throw('Body parse error', 422);
  }
}))
.use(routers)

app.listen(CONFIG.APP.port, CONFIG.APP.host);
console.log(`API Server started at http://${CONFIG.APP.host}:${CONFIG.APP.port}`);


