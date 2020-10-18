const router = require('express').Router()
const Category = require( __srcdir + '/models/Category' )
const categoryController = new ApiController(Category)
const { auth } = require('./middlewares/auth.middleware')
const { checkIfValidId, categoryValidation } = require('./middlewares/category.middleware')


router.post(
	'/', 
	categoryValidation,
	categoryController.createOne.bind(categoryController)
)

router.get(
	'/', 
	categoryController.readAll.bind(categoryController)
)

router.get(
	'/trashed', 
	categoryController.readAllTrash.bind(categoryController)
)

router.get(
	'/:id', 
	checkIfValidId,
	categoryController.readOneById.bind(categoryController)
)
	
router.patch(
	'/:id',
	[ checkIfValidId, categoryValidation],
	categoryController.updateOne.bind(categoryController)
)

router.patch(
	'/:id/trash', 
	checkIfValidId,
	categoryController.trashOne.bind(categoryController)
)

router.patch(
	'/:id/restore', 
	checkIfValidId,
	categoryController.restoreOne.bind(categoryController)
)

router.delete(
	'/:id', 
	checkIfValidId,
	categoryController.deleteOnePermanently.bind(categoryController)
)

module.exports = router