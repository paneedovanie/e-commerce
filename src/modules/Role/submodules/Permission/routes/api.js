const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/rolePermission.controller`)
const moduleName = 'rolePermission'
const { 
	validation,
	checkIfValidId: checkId 
} = require('./middlewares/rolePermission.middleware')


let rolePermissionRoutes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: `/api/${apiVer}/role/permissions`,
  routes: rolePermissionRoutes
}