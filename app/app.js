const Koa = require('koa')
const error = require('koa-json-error')
const parameter = require('koa-parameter')

const app = new Koa()
const routing = require('./routes')

app.use(error())

app.use(parameter(app))

routing(app)

app.listen(3000,() => {
  console.log('new http server start')
})