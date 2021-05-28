const Router = require('koa-router')
const router = new Router({ prefix: '/health' })

router.get('/', (ctx) => {
  ctx.status = 200
})

module.exports = router