const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/productcategory.controller`)
const moduleName = 'productcategory'
const { 
  validation,
  checkIfValidId: checkId 
} = require('./middlewares/productcategory.middleware')


let productcategoryRoutes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: `/api/${apiVer}/product/productcategorys`,
  routes: productcategoryRoutes
}