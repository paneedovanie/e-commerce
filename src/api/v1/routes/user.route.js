const router = require('express').Router()
const userController = require('./controllers/user.controller')


// CREATE USER
router.post(
	'/', 
	userController.createOne
)

// READ ALL USERS
router.get(
		'/', 
		userController.readAll
	)

// REGISTER USER
router.post(
	'/register', 
	userController.register
)

// REGISTER LOGIN
router.post(
	'/login', 
	userController.login
)

// READ ALL TRASHED USERS
router.get(
		'/trashed', 
		userController.readAllTrash
	)

// READ USER
router.get(
		'/:id', 
		userController.readOne
	)
	
// UPDATE USER
router.patch(
		'/:id',
		userController.updateOne
	)

// TRASH USER
router.patch(
		'/:id/trash', 
		userController.trashOne
	)

// RESTORE USER
router.patch(
		'/:id/restore', 
		userController.restoreOne
	)

// DELETE USER
router.delete(
		'/:id', 
		userController.deleteOnePermanently
	)

module.exports = router