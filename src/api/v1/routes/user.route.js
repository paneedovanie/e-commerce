const router = require('express').Router()
const User = require( __srcdir + '/models/User' )
const UserController = require('./controllers/user.controller')
const userController = new UserController(User)
const { auth } = require('./middlewares/auth.middleware')
const { loginValidation, createValidation, checkIfValidId } = require('./middlewares/user.middleware')

router.post(
	'/', 
	[auth('user.create'), createValidation],
	userController.createOne.bind(userController)
)

router.get(
	'/', 
	auth('user.read'),
	userController.readAll.bind(userController)
)

router.post(
	'/register', 
	createValidation,
	userController.register.bind(userController)
)

router.post(
	'/login', 
	loginValidation,
	userController.login.bind(userController)
)

router.post(
	'/', 
	userController.register.bind(userController)
)

router.get(
	'/trashed', 
	auth('user.trashed'),
	userController.readAllTrash.bind(userController)
)

router.get(
	'/:id', 
	auth('user.read'),
	userController.readOneById.bind(userController)
)
	
router.patch(
	'/:id',
	[ auth('user.update'), checkIfValidId ],
	userController.updateOne.bind(userController)
)

router.patch(
	'/:id/trash', 
	auth('user.trash'),
	userController.trashOne.bind(userController)
)

router.patch(
	'/:id/restore', 
	auth('user.restore'),
	userController.restoreOne.bind(userController)
)

router.delete(
	'/:id',
	auth('user.delete'),
	userController.deleteOnePermanently.bind(userController)
)

module.exports = router