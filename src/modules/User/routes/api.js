const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/user.controller`)
const moduleName = 'user'
const { loginValidation, createValidation } = require('./middlewares/user.middleware')

let userRoutes = CoreRoute(moduleName, controller)

userRoutes.post(
	'/login',
	loginValidation,
	controller.login.bind(controller)
)

userRoutes.post(
	'/register', 
	createValidation,
	controller.register.bind(controller)
)

module.exports = {
  routeName: `/api/${apiVer}/${moduleName}s`,
  routes: userRoutes
}