const router = require('express').Router()
const quoteController = require('./controllers/quote.controller')


// CREATE QUOTE
router.post(
	'/', 
	quoteController.createOne
)

// READ ALL QUOTES
router.get(
		'/', 
		quoteController.readAll
	)

// READ ALL TRASHED QUOTES
router.get(
		'/trashed', 
		quoteController.readAllTrash
	)

// READ QUOTE
router.get(
		'/:id', 
		quoteController.readOne
	)
	
// UPDATE QUOTE
// router.patch(
// 		'/:id',
// 		quoteController.updateOne
// 	)

// TRASH QUOTE
router.patch(
		'/:id/trash', 
		quoteController.trashOne
	)

// RESTORE QUOTE
router.patch(
		'/:id/restore', 
		quoteController.restoreOne
	)

// DELETE QUOTE
router.delete(
		'/:id', 
		quoteController.deleteOnePermanently
	)

module.exports = router