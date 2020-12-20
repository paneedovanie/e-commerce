const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/permission.controller`)
const moduleName = 'permission'

module.exports = {
  routeName: `/api/${apiVer}/${moduleName}s`,
  routes: CoreRoute(moduleName, controller)
}