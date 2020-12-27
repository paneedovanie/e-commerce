const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/producttype.controller`)
const moduleName = 'producttype'
const { 
  validation,
  checkIfValidId: checkId 
} = require('./middlewares/producttype.middleware')


let producttypeRoutes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: `/api/${apiVer}/product/producttypes`,
  routes: producttypeRoutes
}