const Router = require('koa-router')
const router = new Router({ prefix: '/nodepdf' })
const { deal } =require('../controllers/nodePdf')

router.get('/', deal)

module.exports = router