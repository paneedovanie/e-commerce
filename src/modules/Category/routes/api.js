const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/category.controller`)
const moduleName = 'category'
const { 
	validation,
	checkIfValidId: checkId 
} = require('./middlewares/category.middleware')


let categoryRoutes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: `/api/${apiVer}/categories`,
  routes: categoryRoutes
}