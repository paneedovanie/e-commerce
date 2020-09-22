const router = require('express').Router()
const rolePermissionController = require('./controllers/rolePermission.controller')


// CREATE ROLE PERMISSION
router.post(
	'/', 
	rolePermissionController.createOne
)

// READ ALL ROLE PERMISSIONS
router.get(
		'/', 
		rolePermissionController.readAll
	)

// READ ALL TRASHED ROLE PERMISSIONS
router.get(
		'/trashed', 
		rolePermissionController.readAllTrash
	)

// READ ROLE PERMISSION
router.get(
		'/:id', 
		rolePermissionController.readOne
	)
	
// UPDATE ROLE PERMISSION
router.patch(
		'/:id',
		rolePermissionController.updateOne
	)

// TRASH ROLE PERMISSION
router.patch(
		'/:id/trash', 
		rolePermissionController.trashOne
	)

// RESTORE ROLE PERMISSION
router.patch(
		'/:id/restore', 
		rolePermissionController.restoreOne
	)

// DELETE ROLE PERMISSION
router.delete(
		'/:id', 
		rolePermissionController.deleteOnePermanently
	)

module.exports = router