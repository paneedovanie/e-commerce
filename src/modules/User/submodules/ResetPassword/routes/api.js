const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/resetPassword.controller`)
const moduleName = 'resetPassword'

module.exports = {
  routeName: `/api/${apiVer}/reset_password`,
  routes: CoreRoute(moduleName, controller)
}