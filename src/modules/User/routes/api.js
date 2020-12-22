const apiVer = 'v1'
const CoreRoute = require(`${ __srcdir }/core/routes/core.routes`)
const controller = require(`../controllers/api/${apiVer}/user.controller`)
const moduleName = 'user'
const { 
	loginValidation: login, 
	createValidation: create, 
	updateValidation: update, 
	checkIfValidId: checkId 
} = require('./middlewares/user.middleware')

let userRoutes = CoreRoute(moduleName, controller, { create, update, checkId })

userRoutes.post(
	'/login',
	login,
	controller.login.bind(controller)
)

userRoutes.post(
	'/register', 
	create,
	controller.register.bind(controller)
)

module.exports = {
  routeName: `/api/${apiVer}/${moduleName}s`,
  routes: userRoutes
}