const router = require('express').Router()
const userController = require('./controllers/user.controller')
const { createUserValidation, updateUserValidation, loginUserValidation, usernameExists, usernameNotExists, emailNotExists, hashPassword } = require('./middlewares/user.validation')
const { checkIfValidId } = require('./middlewares/general.validation')

// REGISTER USER
router.post(
	'/register', 
	[
		createUserValidation, 
		usernameNotExists, 
		emailNotExists,
		hashPassword
	], 
	userController.register
)

// REGISTER LOGIN
router.post(
	'/login', 
	loginUserValidation,
	userController.login
)

// READ ALL USERS
router.get(
		'/', 
		userController.readAll
	)

// READ ALL TRASHED USERS
router.get(
		'/trashed', 
		userController.readAllTrash
	)

// READ USER
router.get(
		'/:id', 
		checkIfValidId, 
		userController.readOne
	)

// CREATE USER
router.post(
        '/', 
        [
            createUserValidation, 
            usernameNotExists, 
            emailNotExists,
            hashPassword
        ], 
        userController.createOne
	)
	
// UPDATE USER
router.patch(
		'/:id', 
		[
			checkIfValidId,
			updateUserValidation
		], 
		userController.updateOne
	)

// TRASH USER
router.patch(
		'/:id/trash', 
		checkIfValidId, 
		userController.trashOne
	)

// RESTORE USER
router.patch(
		'/:id/restore', 
		checkIfValidId, 
		userController.restoreOne
	)

// DELETE USER
router.delete(
		'/:id', 
		checkIfValidId, 
		userController.deleteOnePermanently
	)

module.exports = router