const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/category.controller`)
const moduleName = 'category'

module.exports = {
  routeName: `/api/${apiVer}/categories`,
  routes: CoreRoute(moduleName, controller)
}