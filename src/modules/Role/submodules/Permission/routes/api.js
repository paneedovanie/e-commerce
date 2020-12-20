const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/rolePermission.controller`)
const moduleName = 'rolePermission'

module.exports = {
  routeName: `/api/${apiVer}/${moduleName}s`,
  routes: CoreRoute(moduleName, controller)
}