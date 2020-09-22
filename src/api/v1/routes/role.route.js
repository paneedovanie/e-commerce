const router = require('express').Router()
const roleController = require('./controllers/role.controller')


// CREATE ROLE
router.post(
	'/', 
	roleController.createOne
)

// READ ALL ROLES
router.get(
		'/', 
		roleController.readAll
	)

// READ ALL TRASHED ROLES
router.get(
		'/trashed', 
		roleController.readAllTrash
	)

// READ ROLE
router.get(
		'/:id', 
		roleController.readOne
	)
	
// UPDATE ROLE
router.patch(
		'/:id',
		roleController.updateOne
	)

// TRASH ROLE
router.patch(
		'/:id/trash', 
		roleController.trashOne
	)

// RESTORE ROLE
router.patch(
		'/:id/restore', 
		roleController.restoreOne
	)

// DELETE ROLE
router.delete(
		'/:id', 
		roleController.deleteOnePermanently
	)

module.exports = router