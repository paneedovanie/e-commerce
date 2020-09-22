const router = require('express').Router()
const emotionController = require('./controllers/emotion.controller')

// READ MOOD
router.post(
	'/mood', 
	emotionController.readMood
)

// CREATE EMOTION
router.post(
	'/', 
	emotionController.createOne
)

// READ ALL EMOTIONS
router.get(
		'/', 
		emotionController.readAll
	)

// READ ALL TRASHED EMOTIONS
router.get(
		'/trashed', 
		emotionController.readAllTrash
	)

// READ EMOTION
router.get(
		'/:id', 
		emotionController.readOne
	)
	
// UPDATE EMOTION
router.patch(
		'/:id',
		emotionController.updateOne
	)

// TRASH EMOTION
router.patch(
		'/:id/trash', 
		emotionController.trashOne
	)

// RESTORE EMOTION
router.patch(
		'/:id/restore', 
		emotionController.restoreOne
	)

// DELETE EMOTION
router.delete(
		'/:id', 
		emotionController.deleteOnePermanently
	)

module.exports = router