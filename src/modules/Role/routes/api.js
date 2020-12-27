const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/role.controller`)
const moduleName = 'role'
const { 
	validation,
	checkIfValidId: checkId 
} = require('./middlewares/role.middleware')


let roleRoutes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: `/api/${apiVer}/${moduleName}s`,
  routes: roleRoutes
}