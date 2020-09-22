const router = require('express').Router()
const userController = require('./controllers/user.controller')
const { auth } = require('./middlewares/auth.middleware')


// CREATE USER
router.post(
	'/', 
	auth('user.create'),
	userController.createOne
)

// READ ALL USERS
router.get(
	'/', 
	auth('user.read'),
	userController.readAll	
)

// REGISTER USER
router.post(
	'/register', 
	userController.register
)

// LOGIN
router.post(
	'/login', 
	userController.login
)

// READ ALL TRASHED USERS
router.get(
	'/trashed', 
	auth('user.trashed'),
	userController.readAllTrash
)

// READ USER
router.get(
	'/:id', 
	auth('user.read'),
	userController.readOne
)
	
// UPDATE USER
router.patch(
	'/:id',
	auth('user.update'),
	userController.updateOne
)

// TRASH USER
router.patch(
	'/:id/trash', 
	auth('user.trash'),
	userController.trashOne
)

// RESTORE USER
router.patch(
	'/:id/restore', 
	auth('user.restore'),
	userController.restoreOne
)

// DELETE USER
router.delete(
	'/:id', 
	auth('user.delete'),
	userController.deleteOnePermanently
)

module.exports = router