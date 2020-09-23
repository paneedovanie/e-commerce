const router = require('express').Router()
const categoryController = require('./controllers/category.controller')

// CREATE CATEGORY
router.post(
	'/', 
	categoryController.createOne
)

// READ ALL CATEGORIES
router.get(
		'/', 
		categoryController.readAll
	)

// READ ALL TRASHED CATEGORIES
router.get(
		'/trashed', 
		categoryController.readAllTrash
	)

// READ CATEGORY
router.get(
		'/:id', 
		categoryController.readOne
	)
	
// UPDATE CATEGORY
router.patch(
		'/:id',
		categoryController.updateOne
	)

// TRASH CATEGORY
router.patch(
		'/:id/trash', 
		categoryController.trashOne
	)

// RESTORE CATEGORY
router.patch(
		'/:id/restore', 
		categoryController.restoreOne
	)

// DELETE CATEGORY
router.delete(
		'/:id', 
		categoryController.deleteOnePermanently
	)

module.exports = router