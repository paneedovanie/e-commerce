const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/product.controller`)
const moduleName = 'product'
const { 
  validation,
  checkIfValidId: checkId 
} = require('./middlewares/product.middleware')


let productRoutes = CoreRoute(moduleName, controller, { create: validation, update: validation, checkId })

module.exports = {
  routeName: `/api/${apiVer}//s`,
  routes: productRoutes
}